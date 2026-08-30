import { create } from "zustand";
import api from "../api/axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      set({
        user: response.data,
        token: response.data.token,
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      return false;
    }
  },

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      // Calls your real backend POST /auth/signup endpoint
      const response = await api.post("/auth/register", userData);
      localStorage.setItem("token", response.data.token);
      set({
        user: response.data,
        token: response.data.token,
        isLoading: false,
      });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Signup failed",
        isLoading: false,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    // Important: Also clear session row on backend later
    set({ user: null, token: null });
  },
}));
