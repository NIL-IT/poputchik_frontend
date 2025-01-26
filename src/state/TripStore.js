import { create } from "zustand";

export const useTrip = create((set) => ({
  tripFrom: {
    name: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  },
  setTripFrom: (value) => set({ tripFrom: value }),

  tripTo: {
    name: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
  },
  setTripTo: (value) => set({ tripTo: value }),

  date: "",
  setTripDate: (value) => set({ date: value }),

  persons: 1,
  increaseTripPerson: () => set((state) => ({ persons: state.persons + 1 })),

  decreaseTripPerson: () => set((state) => ({ persons: state.persons > 1 ? state.persons - 1 : 1 })),
  setPersons: (value) => set({ persons: value }),
  price: 500,
  setTripPrice: (value) => set({ price: value }),

  bookedDrive: {},
  setBookedDrive: (value) => set({ bookedDrive: value }),
}));
