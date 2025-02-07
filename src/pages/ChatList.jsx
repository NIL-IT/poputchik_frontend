import { useNavigate } from "react-router-dom";
import CloseBtn from "../UI/CloseBtn";
import { usePassengerList } from "../api/passenger";
import { useTripsList } from "../api/trips";
import { useUserStore } from "../state/UserStore";
import Profile from "../UI/Profile/Profile";
export default function ChatList() {
  const { currentRole, currentUser } = useUserStore();
  const driverList =
    currentRole === "driver" ? usePassengerList(currentUser.driver_profile?.id) : useTripsList(currentUser.city);
  function renderList() {
    if (currentRole == "driver" && driverList) {
      return driverList.map((item) => {
        if (item.booked_trips)
          return item.booked_trips.slice(0, 2).map((trip) => {
            return (
              <Profile
                key={trip.id}
                drive={trip}
                passenger={item.user}
              />
            );
          });
      });
    } else if (currentRole == "passenger") {
      return driverList.map((obj) => {
        return (
          <Profile
            key={obj.id}
            drive={obj}
          />
        );
      });
    }
  }
  const navigate = useNavigate();
  return (
    <div className='flex flex-col h-screen mx-auto'>
      <CloseBtn
        className='absolute top-[50px]  right-5 w-11 h-11 rounded-full flex justify-center items-center bg-[#fff] shadow-btnback z-10'
        onClick={() => navigate(-1)}
      />
      <div className='pt-[60px] h-[170px] bg-orange-500 text-white p-8 text-[32px] leading-8 font-semibold'></div>
      <div className='container-custom'>{renderList()}</div>
    </div>
  );
}
