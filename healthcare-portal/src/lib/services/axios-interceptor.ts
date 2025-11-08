// src/lib/services/axios-interceptor.ts
import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { toast } from "sonner";
import { store } from "../../store";
import { logout } from "../../store/slices/authSlice";
import { BASE_API_URL } from "../constant";

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const AxiosInterceptor = (
  baseURL: string,
  isProtected: boolean = false
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  });

  console.log("baseurl", baseURL);

  // Add request interceptor for protected routes
  if (isProtected) {
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        // Special handling for SSE streaming requests
        if (
          config.responseType === "stream" &&
          config.headers?.Accept === "text/event-stream"
        ) {
          // Configure axios for proper SSE handling
          config.timeout = 0; // Disable timeout for streaming

          // Ensure proper content type for SSE
          config.headers["Content-Type"] = "application/json";
          config.headers["X-Accel-Buffering"] = "no"; // Disable nginx buffering
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor for token refresh logic
    instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: any) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve) => {
              addRefreshSubscriber((token: string) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(axios(originalRequest));
              });
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          try {
            const currentToken = localStorage.getItem("refreshToken");
            const response = await axios.get(`${BASE_API_URL}/refresh`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentToken}`,
              },
            });

            if (response?.status === 200) {
              const { access_token } = response.data.data;
              localStorage.setItem("token", access_token);

              // Retry original request with new token
              originalRequest.headers.Authorization = `Bearer ${access_token}`;
              onRefreshed(access_token);
              return axios(originalRequest);
            } else {
              return Promise.reject(response);
            }
          } catch (refreshError) {
            triggerLogout();
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        // Handle 403 or other errors
        if (error.response?.status === 403) {
          // triggerLogout();
        }
        return Promise.reject(
          error.response ? error : new Error("Network Error")
        );
      }
    );
  }

  return instance;
};

// Helper functions
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const triggerLogout = () => {
  if (window.location.pathname !== "/signin") {
    toast.error("There was an error. Please log in again");

    store.dispatch(logout()).catch((error: any) => {
      console.error("Error while triggering logout", error);
      setTimeout(() => {
        window.location.assign("/sigin");
      }, 1000);
    });
  }
};

export default AxiosInterceptor;
