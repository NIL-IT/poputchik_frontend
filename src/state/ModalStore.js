import { create } from "zustand";

export const useModal = create((set) => ({
  isCalendarOpen: false,
  toggleCalendar: (state) => set({ isCalendarOpen: state }),

  isPriceOpen: false,
  togglePrice: (state) => set({ isPriceOpen: state }),

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

  isFeedbackSummaryOpen: true,
  setIsFeedbackSummaryOpen: (value) => set({ isFeedbackSummaryOpen: value }),
}));
