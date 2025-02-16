import { create } from "zustand";

export const useModal = create((set) => ({
  isCalendarOpen: false,
  toggleCalendar: (state) => set({ isCalendarOpen: state }),

  isPersonOpen: false,
  togglePersonModal: (state) => set({ isPersonOpen: state }),

  isSearchOpen: false,
  toggleSearch: (state) => set({ isSearchOpen: state }),

  activeInput: "",
  setActiveInput: (value) => set({ activeInput: value }),

  isFeedBackOpen: false,
  toggleFeedback: (value) => set({ isFeedBackOpen: value }),

  selectedDriver: {},
  setSelectedDriver: (value) => set({ selectedDriver: value }),

  bookedModal: false,
  toggleBookedModal: (value) => set({ bookedModal: value }),

  isCreating: false,
  setIsCreating: (value) => set({ isCreating: value }),

  carPhoto: "",
  setCarPhoto: (value) => set({ carPhoto: value }),

  carModal: false,
  toggleCarModal: (value) => set({ carModal: value }),

  isFilterModalOpen: false,
  setFilterModalOpen: (value) => set({ isFilterModalOpen: value }),
}));
