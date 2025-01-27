import { create } from "zustand";

export const useMap = create((set) => ({
  city: "",
  setCity: (city) => set({ city }),
  center: [51.9582, 85.9603],
  setCenter: (center) => set({ center: center }),
  userLocation: "",

  startPoint: [],
  setStartPoint: (state) => set({ startPoint: state }),
  endPoint: [],
  setEndPoint: (state) => set({ endPoint: state }),

  isRouteEnabled: false,
  setIsRouteEnabled: (state) => set({ isRouteEnabled: state }),

  routeDistance: 0,
  setRouteDistance: (value) => set({ routeDistance: value }),

  routeDuration: "",
  setRouteDuration: (value) => set({ routeDuration: value }),
}));
