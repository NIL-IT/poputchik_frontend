import Profile from "../UI/Profile/Profile";
import BackButton from "../UI/BackButton";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";
import { usePassengerList } from "../api/passenger";
import { useTripsList } from "../api/trips";

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

  return (
    <div className='pt-10 relative flex flex-col items-center jc w-full min-h-screen'>
      <BackButton onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8'>
        Список {currentRole == "driver" ? "пассажиров" : "водителей"}
      </h3>
      <div className='flex flex-col gap-4 w-full justify-center items-center'>
        {filteredList && filteredList.length > 0 ? (
          filteredList.map((obj) => (
            <Profile
              key={obj.id}
              drive={obj}
              onList={true}
            />
          ))
        ) : (
          <>Активных водителей сейчас нет</>
        )}
      </div>
    </div>
  );
}
