import { create } from "zustand";

export const useUserStore = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || {
    name: "Антон Татарченко",
    phone: "+132131231",
    profile_photo: "https://i.pravatar.cc/150?img=4",
    email: "xd@mail.ru",
    city: "Новосибирск",
  },
  setCurrentUser: (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    set({ currentUser: user });
  },
  currentRole: "passenger",
  changeCurrentUser: () => {},
  changeCurrentRole: (role) => set({ currentRole: role }),
}));
