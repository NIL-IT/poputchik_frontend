import Profile from "../UI/Profile/Profile";
import BackButton from "../UI/BackButton";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";
import { usePassengerList } from "../api/passenger";
import { useRequests, useTripsList } from "../api/trips";

export default function PeopleList() {
  const navigate = useNavigate();
  const { currentUser, currentRole } = useUserStore();

  const passengerList = usePassengerList(currentUser.driver_profile?.id);
  const tripsList = useTripsList(currentUser.city);

  const driverList = currentRole === "driver" && currentUser.driver_profile ? passengerList : tripsList;

  const filteredList =
    driverList && currentUser.driver_profile
      ? driverList.filter((i) => i.driver_id !== currentUser.driver_profile.id)
      : driverList;

  const waitingList = currentRole == "driver" ? useRequests(currentUser.driver_profile?.id) : [];
  function renderList() {
    const renderedWaitingList =
      currentRole === "driver" && waitingList && waitingList.length > 0
        ? waitingList.map((request) => (
            <Profile
              key={`waiting-${request.id}`}
              drive={request.trip}
              passenger={request.passenger.user}
              pending
              request={request}
            />
          ))
        : null;

    const renderedMainList = filteredList?.map((item) => {
      if (currentRole === "driver" && item.booked_trips) {
        return item.booked_trips.slice(0, 2).map((trip) => (
          <Profile
            key={trip.id}
            drive={trip}
            passenger={item.user}
            onList
          />
        ));
      } else if (currentRole === "passenger") {
        return (
          <Profile
            key={item.id}
            drive={item}
            onList
          />
        );
      }
      return null;
    });

    return (
      <>
        {renderedWaitingList}
        {renderedMainList}
      </>
    );
  }
  return (
    <div className='pt-10 relative flex flex-col items-center jc w-full min-h-screen'>
      <BackButton onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8 max-w-[250px]'>
        Список {currentRole == "driver" ? "пассажиров твоих поездок" : "водителей"}
      </h3>
      <div className='flex flex-col gap-4 w-full justify-center items-center'>
        {filteredList ? renderList() : <>Активных водителей сейчас нет</>}
      </div>
    </div>
  );
}
