import { create } from "zustand";

export const useToastStore = create((set) => ({
  toast: null, // Stores { message, type: 'success' | 'error' }

  showToast: (message, type = "success", duration = 4000) => {
    set({ toast: { message, type } });
    setTimeout(() => {
      set({ toast: null });
    }, duration);
  },

  hideToast: () => set({ toast: null }),
}));
