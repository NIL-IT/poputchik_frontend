import { useEffect, useRef } from "react";
import { useList } from "../state/listStore";
import { useUserStore } from "../state/UserStore";

function useGlobalListInitializer({ driverList, activeDrives, waitingList, historyList }) {
  const { currentUser } = useUserStore();
  const { setMainList, setActiveList, setWaitingList, setHistoryList } = useList();
  const prevListsRef = useRef();

  useEffect(() => {
    if (currentUser) {
      const newLists = { driverList, activeDrives, waitingList };
      if (JSON.stringify(newLists) !== JSON.stringify(prevListsRef.current)) {
        setMainList(driverList);
        setActiveList(activeDrives);
        setWaitingList(waitingList);
        setHistoryList(historyList);
        prevListsRef.current = newLists;
      }
    }
  }, [currentUser, driverList, activeDrives, waitingList, setMainList, setActiveList, setWaitingList]);
}

export default useGlobalListInitializer;
