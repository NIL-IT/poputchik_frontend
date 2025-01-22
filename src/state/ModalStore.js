import { create } from "zustand";

export const useModal = create((set) => ({
  isCalendarOpen: false,
  toggleCalendar: (state) => set({ isCalendarOpen: state }),

  isPriceOpen: false,
  togglePrice: (state) => set({ isPriceOpen: state }),

  isPersonOpen: false,
  togglePersonModal: (state) => set({ isPersonOpen: state }),

  isDriversOpen: false,
  toggleDrivers: (state) => set({ isDriversOpen: state }),

  isSearchOpen: false,
  toggleSearch: (state) => set({ isSearchOpen: state }),
  isActiveDrivesOpen: false,

  toggleActiveDrive: (state) => set({ isActiveDrivesOpen: state }),

  activeInput: "",
  setActiveInput: (value) => set({ activeInput: value }),

  isFeedBackOpen: false,
  toggleFeedback: (value) => set({ isFeedBackOpen: value }),

  isProfileOpen: false,
  toggleProfile: (value) => set({ isProfileOpen: value }),

  selectedDriver: {},
  setSelectedDriver: (value) => set({ selectedDriver: value }),
}));
