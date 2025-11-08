import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BASE_API_URL } from "./constant";
import AxiosInterceptor from "./services/axios-interceptor";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const publicAPI = AxiosInterceptor(BASE_API_URL);
export const protectedAPI = AxiosInterceptor(BASE_API_URL, true);