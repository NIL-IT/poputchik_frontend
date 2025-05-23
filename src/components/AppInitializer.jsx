import { useEffect, useRef } from "react";
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
  const { setPosition, positon, setCity, setCenter,setGeoReady } = useMap();
  const { currentUser, currentRole } = useUserStore();
  const hasDriverProfile = Boolean(currentUser?.driver_profile?.id);
  const isDriver = currentRole === "driver";
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
  }, [setPosition, setCenter]);

  useEffect(() => {
    if (positon && positon.length === 2) {
      getCityByCoordinates(setCity).then(()=>{
        setGeoReady(true)
      });
    }
  }, [positon, setCity]);

  const activeTripsData = useDriversTripsList(driverId, "active");
  const startedTripsData = useDriversTripsList(driverId, "started");
  const bookedTripsData = useDriversTripsList(driverId, "booked");
  const requestsData = useRequests(driverId);

  const bookedTripsList = useBookedTripsList(passengerId);
  const passengerHistoryList = usePassengerTripsList(passengerId, "finished");
  const driverHistoryList = useDriversTripsList(driverId, "finished");

  const historyList =
    currentRole === "passenger" && passengerId
      ? passengerHistoryList || []
      : hasDriverProfile
      ? driverHistoryList || []
      : [];

  const activeTrips = driverId ? activeTripsData || [] : [];
  const startedTrips = driverId ? startedTripsData || [] : [];
  const bookedTrips = driverId ? bookedTripsData || [] : [];
  const waitingList = isDriver && driverId ? requestsData || [] : [];

  const activeDrives =
    currentRole === "passenger" && currentUser?.passenger_profile
      ? bookedTripsList || []
      : hasDriverProfile
      ? [...activeTrips, ...startedTrips, ...bookedTrips]
      : [];

  const effectivePassengersList = passengerList || [] ;
  const effectivePassengerTripsList =  tripsListByPassenger || [] ;
  const effectiveDriversList =
    !isDriver
      ? tripsList?.filter(trip => !trip.is_passenger_create && trip.city === currentUser?.city) || []
      : [];

  const hasValidUser = Boolean(currentUser && Object.keys(currentUser).length > 0);

  const effectiveDriveList = hasValidUser ? tripsList || [] : [];
  const effectiveActiveDrives = hasValidUser ? activeDrives : [];
  const effectiveWaitingList = hasValidUser ? waitingList : [];
  const effectiveHistoryList = hasValidUser ? historyList : [];

  const setInitialized = useList(s => s.setInitialized);
  const fetchingCount = useIsFetching();
  const didInitRef = useRef(false);

  useEffect(() => {
    if (!didInitRef.current && fetchingCount === 0) {
      setInitialized(true);
      didInitRef.current = true;
    }
  }, [fetchingCount, setInitialized]);
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
