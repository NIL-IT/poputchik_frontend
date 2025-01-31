import Profile from "../UI/Profile/Profile";
import BackButton from "../UI/BackButton";
import { useNavigate } from "react-router-dom";
import { useDriverByCity } from "../api/api";
import { useUserStore } from "../state/UserStore";

export default function PeopleList() {
  const navigate = useNavigate();
  const { currentUser } = useUserStore();
  const driverList = useDriverByCity(currentUser.city);
  console.log(driverList);
  return (
    <div className='pt-10 relative flex flex-col items-center jc w-full min-h-screen'>
      <BackButton onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8'>Список водителей</h3>
      <div className='flex flex-col gap-4 w-full justify-center items-center'>
        {driverList.length > 0 ? (
          driverList.map((obj) => {
            return (
              <Profile
                key={obj.id}
                driver={obj}
              />
            );
          })
        ) : (
          <>Активных водителей сейчас нет</>
        )}
      </div>
    </div>
  );
}
