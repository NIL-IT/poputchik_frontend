import { create } from "zustand";
import { useUserStore } from "./UserStore";

function filterList(list) {
  if (!list) return;
  const { currentUser } = useUserStore.getState();
  const filtered = list.filter((i) => i.state !== "booked" && i.state !== "finished");
  if (currentUser.driver_profile) {
    return filtered.filter(
      (i) =>
        i.driver_id !== currentUser.driver_profile.id &&
        !i.passengers.map((p) => p.id).includes(currentUser.passenger_profile.id),
    );
  } else return filtered;
}

export function filterTripsByTime(startDateTime, endDateTime, list) {
  if (!list || !startDateTime || !endDateTime) return [];

  return list.filter((trip) => {
    const tripTime = new Date(trip.departure_time);
    return tripTime >= startDateTime && tripTime <= endDateTime;
  });
}

export const useList = create((set) => ({
  mainList: [],

  activeList: [],
  historyList: [],
  waitingList: [],
  filteredList: [],
  tripsByPassenger: [],
  isFiltered: false,

  setPassengersList: (value) => set({ passengersList: value }),
  setTripsByPassenger: (value) => set({ tripsByPassenger: filterList(value) }),
  setDriversList: (value) => set({ driversList: value }),
  setMainList: (value) => set({ mainList: filterList(value) }),
  setDriveList: (value) => set({ driveList: filterList(value) }),
  setActiveList: (value) => set({ activeList: value }),
  setWaitingList: (value) => set({ waitingList: value }),
  setHistoryList: (value) => set({ historyList: value }),
  setFilteredList: (value) => set({ filteredList: value }),
  setIsFiltered: (value) => set({ isFiltered: value }),
   initialized: false,
  setInitialized: (value) => set({ initialized: value }),
  applyTimeFilter: (startDateTime, endDateTime, list) =>
    set((state) => ({
      filteredList: filterTripsByTime(startDateTime, endDateTime, list),
      isFiltered: true,
    })),

  clearTimeFilter: () =>
    set((state) => ({
      filteredList: [],
      isFiltered: false,
    })),
}));
