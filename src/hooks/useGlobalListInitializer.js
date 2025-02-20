import { useEffect, useRef } from "react";
import { useList } from "../state/listStore";
import { useUserStore } from "../state/UserStore";

function useGlobalListInitializer({
  passengersList,
  passengerTripsList, // добавляем новый параметр
  driversList,
  driveList,
  activeDrives,
  waitingList,
  historyList,
}) {
  const { currentUser } = useUserStore();
  const {
    setPassengersList,
    setPassengerTripsList, // добавляем новый сеттер
    setDriversList,
    setMainList,
    setActiveList,
    setWaitingList,
    setHistoryList,
    setDriveList,
  } = useList();
  const prevListsRef = useRef();

  useEffect(() => {
    if (currentUser) {
      const newLists = {
        passengersList,
        passengerTripsList,
        driversList,
        driveList,
        activeDrives,
        waitingList,
      };
      if (JSON.stringify(newLists) !== JSON.stringify(prevListsRef.current)) {
        setPassengersList(passengersList);
        setPassengerTripsList(passengerTripsList);
        setMainList(driversList);
        setDriveList(driveList);
        setActiveList(activeDrives);
        setWaitingList(waitingList);
        setHistoryList(historyList);
        prevListsRef.current = newLists;
      }
    }
  }, [
    currentUser,
    passengersList,
    passengerTripsList,
    driversList,
    activeDrives,
    waitingList,
    setMainList,
    setActiveList,
    setWaitingList,
  ]);
}

export default useGlobalListInitializer;
