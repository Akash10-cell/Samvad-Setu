import { create } from 'zustand';
import { mockApi } from '../api/mockApi';

export const useProblemStore = create((set, get) => ({
  problems: [],
  isLoading: false,

  fetchProblems: async () => {
    set({ isLoading: true });
    const data = await mockApi.getProblems();
    set({ problems: data, isLoading: false });
  },

  addProblem: async (formData) => {
    set({ isLoading: true });
    const created = await mockApi.submitProblem(formData);
    set({ problems: [created, ...get().problems], isLoading: false });
    return created;
  }
}));