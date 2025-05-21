import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";
import { useList } from "../state/listStore";
import { renderWaitingItems, renderMainList } from "../utils/renderListUtils.jsx";
import BackButton from "../components/NavigationButton/components/BackButton/BackButton.jsx";

export default function PeopleList() {
  const navigate = useNavigate();

  const { driveList, passengersList, waitingList, isFiltered, filteredList, tripsByPassenger } = useList();
  const isDriver = useUserStore((state) => state.currentRole === "driver");
  function renderList() {
    const listToRender = (isFiltered ? filteredList : isDriver ? [...passengersList, ...tripsByPassenger ]  : driveList).filter(
      (drive) => drive.state !== "started" && drive.state !== "booked",
    );

  const currentDate = new Date();

 const filteredListToRender = listToRender.filter((trip) => {
    if (isDriver) {
      if (Array.isArray(trip.booked_trips)) {
        return trip.booked_trips.some((item) => {
          const tripDate = new Date(item.departure_time);
          return tripDate >= currentDate;
        });
      }
      return new Date(trip.departure_time) >= currentDate;
    } else {
      return new Date(trip.departure_time) >= currentDate;
    }
  });

    const waitingItems = waitingList && isDriver ? renderWaitingItems(waitingList) : [];
    const mainItems = filteredListToRender && renderMainList(isDriver, filteredListToRender, true, false);
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
    <div className='pt-[66px] relative flex flex-col items-center jc w-full min-h-screen'>
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
