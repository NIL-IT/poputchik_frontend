import { useEffect, useMemo, useRef } from "react";
import { useBookedTripsList, usePassengerList } from "../api/passenger";
import {
  useDriversTripsList,
  usePassengerTripsList,
  useRequests,
  useTripsList,
  useTripsListByPassenger,
} from "../api/trips";
import { useUserStore } from "../state/UserStore";
import useGlobalListInitializer from "../hooks/useGlobalListInitializer";
import { useMap } from "../state/MapRoutesStore";
import { getCityByCoordinates, initialLocationRequest, updateLocation } from "../utils/geoInit";
import { useList } from "../state/listStore";
import { useIsFetching } from "@tanstack/react-query";

export default function AppInitializer() {
  const { setPosition, positon, setCity, setCenter } = useMap();
  const { currentUser, currentRole } = useUserStore();
  const hasDriverProfile = Boolean(currentUser?.driver_profile?.id);
  const isDriver = useUserStore((state) => state.currentRole === "driver");
  const driverId = currentUser?.driver_profile?.id || null;
  const passengerId = currentUser?.passenger_profile?.id || null;

  const passengerList = usePassengerList(driverId);
  const tripsList = useTripsList(currentUser?.city);

  const tripsListByPassenger = useTripsListByPassenger(currentUser?.city);

  useEffect(() => {
    const setupLocation = async () => {
      const hasPermission = await initialLocationRequest();
      if (hasPermission) {
        updateLocation(setPosition, setCenter);
      }
    };

    setupLocation();
  }, []);

  useEffect(() => {
    if (positon && positon.length === 2) {
      getCityByCoordinates(setCity);
    }
  }, [positon]);

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

  const effectivePassengersList = useMemo(() => {
    if (isDriver) {
      return passengerList || [];
    }
    return [];
  }, [isDriver, passengerList]);

  const effectivePassengerTripsList = useMemo(() => {
    if (isDriver) {
      return tripsListByPassenger || [];
    }
    return [];
  }, [isDriver, tripsListByPassenger]);

  const effectiveDriversList = useMemo(() => {
    if (!isDriver) {
      return tripsList?.filter((trip) => !trip.is_passenger_create && trip.city === currentUser?.city) || [];
    }
    return [];
  }, [isDriver, tripsList, currentUser?.city]);
  const setInitialized = useList((s) => s.setInitialized);

  // число активных react-query fetch-запросов
  const fetchingCount = useIsFetching();

  // реф, чтобы убедиться, что реакция произойдёт только один раз
  const didInitRef = useRef(false);

  useEffect(() => {
    // если уже инициализировались — больше не запускаем логику
    if (didInitRef.current) return;
    
    // когда все запросы завершились (count === 0)
    if (fetchingCount === 0) {
      setInitialized(true);       // переключаем флаг в Zustand
      didInitRef.current = true;  // заблокируем дальнейшие срабатывания
    }
  }, [fetchingCount, setInitialized]);


  const effectiveDriveList = hasValidUser ? tripsList : [];
  const effectiveActiveDrives = hasValidUser ? activeDrives : [];
  const effectiveWaitingList = hasValidUser ? waitingList : [];
  const effectiveHistoryList = hasValidUser ? historyList : [];

  useGlobalListInitializer({
    passengersList: effectivePassengersList,
    passengerTripsList: effectivePassengerTripsList,
    driversList: effectiveDriversList,
    driveList: effectiveDriveList,
    activeDrives: effectiveActiveDrives,
    waitingList: effectiveWaitingList,
    historyList: effectiveHistoryList,
  });

  return null;
}
