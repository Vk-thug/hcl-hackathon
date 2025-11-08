import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import { protectedAPI, publicAPI } from "../../lib/utils";

// ============= AUTHENTICATION ACTIONS =============

// ============= SIGN UP =============
export const signup = createAsyncThunk(
  "auth/signup",
  async (data: { email: string; password: string; name: string; role?: string }, { rejectWithValue }) => {
    try {
      const response = await publicAPI.post(`/auth/register`, {
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role || "patient"
      });
      
      if (response.data.status === "success") {
        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return response.data;
      }
      
      throw new Error("Registration failed");
    } catch (error: any) {
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        message: error.response?.data?.data?.message || 
                 error.response?.data?.messageCode || 
                 "Registration failed. Please try again.",
      });
    }
  }
);

// ============= SIGN IN =============
export const signin = createAsyncThunk(
  "auth/signin",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await publicAPI.post(`/auth/login`, {
        email: data.email,
        password: data.password
      });
      
      if (response.data.status === "success") {
        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return response.data;
      }
      
      throw new Error("Login failed");
    } catch (error: any) {
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        message: error.response?.data?.data?.message || 
                 error.response?.data?.messageCode === "INVALID_CREDENTIALS" 
                   ? "Invalid email or password" 
                   : "Login failed. Please try again.",
      });
    }
  }
);

// ============= GET CURRENT USER =============
export const authUser = createAsyncThunk(
  "auth/authUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await protectedAPI.get(`/auth/me`);
      
      if (response.data.status === "success") {
        return response.data;
      }
      
      throw new Error("Failed to fetch user data");
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
      
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        message: error.response?.data?.data?.message || "Failed to fetch user data",
      });
    }
  }
);

// ============= REFRESH TOKEN =============
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
      
      const response = await publicAPI.post(`/auth/refresh`, {
        refreshToken
      });
      
      if (response.data.status === "success") {
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        return response.data;
      }
      
      throw new Error("Token refresh failed");
    } catch (error: any) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        message: "Session expired. Please login again.",
      });
    }
  }
);

// ============= LOGOUT =============
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (refreshToken) {
        await protectedAPI.post(`/auth/logout`, {
          refreshToken
        });
      }
      
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      
      return {
        status: "SUCCESS",
        message: "Logged out successfully",
      };
    } catch (error: any) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");
      
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        status: "ERROR",
        message: "Logout completed with errors",
      });
    }
  }
);

// ============= FORGOT PASSWORD =============
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data: { email: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const response = await publicAPI.post(`/auth/forget-password`, {
        email: data.email,
        newPassword: data.newPassword
      });
      
      if (response.data.status === "success") {
        const { accessToken, refreshToken } = response.data.data;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        return response.data;
      }
      
      throw new Error("Password reset failed");
    } catch (error: any) {
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        message: error.response?.data?.data?.message || "Password reset failed",
      });
    }
  }
);

// ============= PATIENT PROFILE ACTIONS =============

// ============= GET PATIENT PROFILE =============
export const getPatientProfile = createAsyncThunk(
  "auth/getPatientProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await protectedAPI.get(`/patients/profile`);
      
      if (response.data.status === "success") {
        return response.data;
      }
      
      throw new Error("Failed to fetch profile");
    } catch (error: any) {
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        message: error.response?.data?.data?.message || "Failed to fetch profile data",
      });
    }
  }
);

// ============= UPDATE PATIENT PROFILE =============
export const updatePatientProfile = createAsyncThunk(
  "auth/updatePatientProfile",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await protectedAPI.put(`/patients/profile`, data);
      
      if (response.data.status === "success") {
        return response.data;
      }
      
      throw new Error("Failed to update profile");
    } catch (error: any) {
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        message: error.response?.data?.data?.message || "Failed to update profile",
      });
    }
  }
);

// ============= GET PATIENT GOALS =============
export const getPatientGoals = createAsyncThunk(
  "auth/getPatientGoals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await protectedAPI.get(`/patients/goals`);
      
      if (response.data.status === "success") {
        return response.data;
      }
      
      throw new Error("Failed to fetch goals");
    } catch (error: any) {
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        message: error.response?.data?.data?.message || "Failed to fetch goals",
      });
    }
  }
);

// ============= ADD/UPDATE PATIENT GOAL =============
export const savePatientGoal = createAsyncThunk(
  "auth/savePatientGoal",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await protectedAPI.post(`/patients/goals`, data);
      
      if (response.data.status === "success") {
        return response.data;
      }
      
      throw new Error("Failed to save goal");
    } catch (error: any) {
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        message: error.response?.data?.data?.message || "Failed to save goal",
      });
    }
  }
);

// ============= GET PATIENT REMINDERS =============
export const getPatientReminders = createAsyncThunk(
  "auth/getPatientReminders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await protectedAPI.get(`/patients/reminders`);
      
      if (response.data.status === "success") {
        return response.data;
      }
      
      throw new Error("Failed to fetch reminders");
    } catch (error: any) {
      return rejectWithValue({
        httpCode: error.response?.status || 500,
        message: error.response?.data?.data?.message || "Failed to fetch reminders",
      });
    }
  }
);

// ============= STATE INTERFACE =============
interface AuthState {
  isAuthenticated: boolean;
  account: any | null;
  profile: any | null;
  goals: any[] | null;
  reminders: any[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  profileStatus: "idle" | "loading" | "succeeded" | "failed";
  goalsStatus: "idle" | "loading" | "succeeded" | "failed";
  remindersStatus: "idle" | "loading" | "succeeded" | "failed";
  message: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  account: null,
  profile: null,
  goals: null,
  reminders: null,
  status: "idle",
  profileStatus: "idle",
  goalsStatus: "idle",
  remindersStatus: "idle",
  message: null,
  error: null,
};

// ============= SLICE =============
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.message = null;
    },
    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.account = null;
      state.profile = null;
      state.goals = null;
      state.reminders = null;
      state.status = "idle";
      state.profileStatus = "idle";
      state.goalsStatus = "idle";
      state.remindersStatus = "idle";
      state.message = null;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      // ============= SIGN UP =============
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.account = action.payload.data?.user;
        state.message = "Account created successfully!";
        state.error = null;
      })
      .addCase(signup.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.payload?.message || "Registration failed";
        state.message = null;
      })
      
      // ============= SIGN IN =============
      .addCase(signin.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.account = action.payload.data?.user;
        state.message = "Signed in successfully!";
        state.error = null;
      })
      .addCase(signin.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.payload?.message || "Login failed";
        state.message = null;
      })
      
      // ============= GET CURRENT USER =============
      .addCase(authUser.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.account = action.payload.data?.user;
        state.status = "succeeded";
        state.message = null;
        state.error = null;
      })
      .addCase(authUser.rejected, (state, action: any) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.account = null;
        state.error = action.payload?.message || "Authentication failed";
        state.message = null;
      })
      
      // ============= REFRESH TOKEN =============
      .addCase(refreshToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action: any) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.account = null;
        state.error = action.payload?.message || "Session expired";
      })
      
      // ============= LOGOUT =============
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.account = null;
        state.isAuthenticated = false;
        state.profile = null;
        state.goals = null;
        state.reminders = null;
        state.status = "idle";
        state.profileStatus = "idle";
        state.goalsStatus = "idle";
        state.remindersStatus = "idle";
        state.message = "Logged out successfully";
        state.error = null;
      })
      .addCase(logout.rejected, (state, action: any) => {
        state.account = null;
        state.isAuthenticated = false;
        state.profile = null;
        state.goals = null;
        state.reminders = null;
        state.status = "idle";
        state.profileStatus = "idle";
        state.goalsStatus = "idle";
        state.remindersStatus = "idle";
        state.error = action.payload?.message || "Logout completed";
      })
      
      // ============= FORGOT PASSWORD =============
      .addCase(forgotPassword.pending, (state) => {
        state.status = "loading";
        state.message = null;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.account = action.payload.data?.user;
        state.message = "Password reset successfully!";
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, action: any) => {
        state.status = "failed";
        state.error = action.payload?.message || "Password reset failed";
        state.message = null;
      })
      
      // ============= GET PATIENT PROFILE =============
      .addCase(getPatientProfile.pending, (state) => {
        state.profileStatus = "loading";
        state.error = null;
      })
      .addCase(getPatientProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.profileStatus = "succeeded";
        state.profile = action.payload.data?.patient;
        state.error = null;
      })
      .addCase(getPatientProfile.rejected, (state, action: any) => {
        state.profileStatus = "failed";
        state.error = action.payload?.message || "Failed to fetch profile";
      })
      
      // ============= UPDATE PATIENT PROFILE =============
      .addCase(updatePatientProfile.pending, (state) => {
        state.profileStatus = "loading";
        state.error = null;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.profileStatus = "succeeded";
        state.profile = action.payload.data?.patient;
        state.message = "Profile updated successfully!";
        state.error = null;
      })
      .addCase(updatePatientProfile.rejected, (state, action: any) => {
        state.profileStatus = "failed";
        state.error = action.payload?.message || "Failed to update profile";
      })
      
      // ============= GET PATIENT GOALS =============
      .addCase(getPatientGoals.pending, (state) => {
        state.goalsStatus = "loading";
        state.error = null;
      })
      .addCase(getPatientGoals.fulfilled, (state, action: PayloadAction<any>) => {
        state.goalsStatus = "succeeded";
        state.goals = action.payload.data?.goals;
        state.error = null;
      })
      .addCase(getPatientGoals.rejected, (state, action: any) => {
        state.goalsStatus = "failed";
        state.error = action.payload?.message || "Failed to fetch goals";
      })
      
      // ============= SAVE PATIENT GOAL =============
      .addCase(savePatientGoal.pending, (state) => {
        state.goalsStatus = "loading";
        state.error = null;
      })
      .addCase(savePatientGoal.fulfilled, (state) => {
        state.goalsStatus = "succeeded";
        state.message = "Goal saved successfully!";
        state.error = null;
      })
      .addCase(savePatientGoal.rejected, (state, action: any) => {
        state.goalsStatus = "failed";
        state.error = action.payload?.message || "Failed to save goal";
      })
      
      // ============= GET PATIENT REMINDERS =============
      .addCase(getPatientReminders.pending, (state) => {
        state.remindersStatus = "loading";
        state.error = null;
      })
      .addCase(getPatientReminders.fulfilled, (state, action: PayloadAction<any>) => {
        state.remindersStatus = "succeeded";
        state.reminders = action.payload.data?.reminders;
        state.error = null;
      })
      .addCase(getPatientReminders.rejected, (state, action: any) => {
        state.remindersStatus = "failed";
        state.error = action.payload?.message || "Failed to fetch reminders";
      });
  },
});

export const { clearError, clearAuthState } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;