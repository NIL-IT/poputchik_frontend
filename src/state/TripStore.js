import { create } from "zustand";

export const useTrip = create((set) => ({
  tripFrom: "",
  setTripFrom: (value) => set({ tripFrom: value }),

  tripTo: "",
  setTripTo: (value) => set({ tripTo: value }),

  date: "",
  setTripDate: (value) => set({ date: value }),

  persons: 1,
  increaseTripPerson: () => set((state) => ({ persons: state.persons + 1 })),

  decreaseTripPerson: () => set((state) => ({ persons: state.persons > 1 ? state.persons - 1 : 1 })),

  price: 500,
  setTripPrice: (value) => set({ price: value }),

  bookedDrive: {},
  setBookedDrive: (value) => set({ bookedDrive: value }),
}));
