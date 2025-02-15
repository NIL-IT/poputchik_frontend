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
  setMainList: (value) => set({ mainList: filterList(value) }),
  chatList: [],
  setChatList: (value) => set({ chatList: value }),
  activeList: [],
  setActiveList: (value) => set({ activeList: value }),
  historyList: [],
}));
