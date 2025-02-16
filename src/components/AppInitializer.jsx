import { useMemo } from "react";
import { useBookedTripsList, usePassengerList } from "../api/passenger";
import { useDriversTripsList, usePassengerTripsList, useRequests, useTripsList } from "../api/trips";
import { useUserStore } from "../state/UserStore";
import useGlobalListInitializer from "../hooks/useGlobalListInitializer";

export default function AppInitializer() {
  const { currentUser, currentRole } = useUserStore();
  const hasDriverProfile = Boolean(currentUser?.driver_profile?.id);
  const isDriver = useUserStore((state) => state.currentRole === "driver");
  const driverId = currentUser?.driver_profile?.id || null;
  const passengerId = currentUser?.passenger_profile?.id || null;

  const passengerList = usePassengerList(driverId);
  const tripsList = useTripsList(currentUser?.city);
  const activeTripsData = useDriversTripsList(driverId, "active");
  const startedTripsData = useDriversTripsList(driverId, "started");
  const bookedTripsData = useDriversTripsList(driverId, "booked");
  const requestsData = useRequests(driverId);
  const bookedTripsList = useBookedTripsList(passengerId);
  const passengerHistoryList = usePassengerTripsList(passengerId, "finished");
  const driverHistoryList = useDriversTripsList(driverId, "finished");

  const historyList = useMemo(() => {
    if (currentRole === "passenger" && passengerId) {
      return passengerHistoryList;
    }
    if (hasDriverProfile) {
      return driverHistoryList;
    }
    return [];
  }, [currentRole, passengerId, hasDriverProfile, passengerHistoryList, driverHistoryList]);

  const hasValidUser = Boolean(currentUser && Object.keys(currentUser).length > 0);

  const activeTrips = useMemo(() => (driverId ? activeTripsData || [] : []), [driverId, activeTripsData]);
  const startedTrips = useMemo(() => (driverId ? startedTripsData || [] : []), [driverId, startedTripsData]);
  const bookedTrips = useMemo(() => (driverId ? bookedTripsData || [] : []), [driverId, bookedTripsData]);
  const waitingList = useMemo(
    () => (isDriver && driverId ? requestsData || [] : []),
    [isDriver, driverId, requestsData],
  );
  const activeDrives = useMemo(() => {
    if (currentRole === "passenger" && currentUser?.passenger_profile) {
      return bookedTripsList || [];
    }
    return currentUser?.driver_profile ? [...activeTrips, ...startedTrips, ...bookedTrips] : [];
  }, [currentRole, currentUser, bookedTripsList, activeTrips, startedTrips, bookedTrips]);

  const driverList = isDriver ? passengerList : tripsList;
  const effectiveDriverList = hasValidUser ? driverList : [];
  const effectiveActiveDrives = hasValidUser ? activeDrives : [];
  const effectiveWaitingList = hasValidUser ? waitingList : [];
  const effectiveHistoryList = hasValidUser ? historyList : [];

  useGlobalListInitializer({
    driverList: effectiveDriverList,
    activeDrives: effectiveActiveDrives,
    waitingList: effectiveWaitingList,
    historyList: effectiveHistoryList,
  });

  return null;
}
