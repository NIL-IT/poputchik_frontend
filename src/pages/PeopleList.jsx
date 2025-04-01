import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";
import { useList } from "../state/listStore";
import { renderWaitingItems, renderMainList } from "../utils/renderListUtils.jsx";
import BackButton from "../components/NavigationButton/components/BackButton/BackButton.jsx";
import { useTripsListByPassenger } from "../api/trips.js";

export default function PeopleList() {
  const navigate = useNavigate();
  const { currentUser } = useUserStore();
  const { driveList, passengersList, waitingList, isFiltered, filteredList } = useList();
  const isDriver = useUserStore((state) => state.currentRole === "driver");
  const tripsListByPassenger = useTripsListByPassenger(currentUser?.city);
  console.log(tripsListByPassenger);
  //DriveList : passengerTripsList : driveList
  // PeopleList: passengersList : driveList
  // const tripsListByPassenger = useTripsListByPassenger(currentUser?.city);
  //  const passengerList = usePassengerList(driverId);
  function renderList() {
    const listToRender = isFiltered ? filteredList : isDriver ? passengersList : driveList;
    const waitingItems = waitingList && isDriver ? renderWaitingItems(waitingList) : [];
    const mainItems = listToRender && renderMainList(isDriver, listToRender, true);
    if (mainItems.length > 0 || waitingItems.length > 0) {
      if (isDriver) {
        return [...waitingItems, ...mainItems];
      } else {
        return [...waitingItems, ...mainItems];
      }
    } else {
      return <>Список пустой</>;
    }
  }

  return (
    <div className='pt-10 relative flex flex-col items-center jc w-full min-h-screen'>
      <BackButton onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8 max-w-[250px]'>
        Список {isDriver ? "пассажиров твоих поездок" : "водителей"}
      </h3>
      <div className='flex flex-col gap-4 w-full justify-center items-center'>
        {(driveList && driveList.length > 0) ||
        (passengersList && passengersList.length > 0) ||
        (waitingList && waitingList.length > 0) ? (
          renderList()
        ) : (
          <>Активных водителей сейчас нет</>
        )}
      </div>
    </div>
  );
}
