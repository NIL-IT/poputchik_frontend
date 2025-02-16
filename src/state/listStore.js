import { create } from "zustand";
import { useUserStore } from "./UserStore";

function filterList(list) {
  if (!list) return;
  const { currentUser } = useUserStore.getState();
  list.filter((i) => i.state !== "booked");
  if (currentUser.driver_profile) {
    return list.filter((i) => i.driver_id !== currentUser.driver_profile.id);
  } else return list;
}

export const useList = create((set) => ({
  mainList: [],
  chatList: [],
  activeList: [],
  historyList: [],
  waitingList: [],
  filteredList: [],

  setMainList: (value) => set({ mainList: filterList(value) }),
  setChatList: (value) => set({ chatList: value }),
  setActiveList: (value) => set({ activeList: value }),
  setWaitingList: (value) => set({ waitingList: value }),
  setHistoryList: (value) => set({ historyList: value }),
  setFilteredList: (value) => set({ filteredList: value }),

  filterTripsByTime: (startDateTime, endDateTime) => {
    set((state) => {
      const filtered = state.mainList.filter((trip) => {
        const tripTime = new Date(trip.departure_time);
        return tripTime >= startDateTime && tripTime <= endDateTime;
      });

      return {
        filteredList: filtered,
      };
    });
  },

  clearTimeFilter: () => {
    set((state) => ({
      filteredList: state.mainList,
    }));
  },
}));
