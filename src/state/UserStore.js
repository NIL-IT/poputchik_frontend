import { create } from "zustand";

export const useUserStore = create((set) => ({
  currentUser: {},
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },
  currentRole: "",
  updateCurrentUser: (updates) =>
    set((state) => ({
      currentUser: { ...state.currentUser, ...updates },
    })),
  changeCurrentRole: (role) => set({ currentRole: role }),
}));
