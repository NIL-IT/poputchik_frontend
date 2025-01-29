import { useDriversTripsList, useTripsList } from "../api/api";
import { useMap } from "../state/MapRoutesStore";
import HistoryCard from "../UI/HistoryCard/HistoryCard";
import CloseBtn from "../UI/CloseBtn";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";

export default function ActiveDrivesPage() {
  const { currentRole, currentUser } = useUserStore();
  const { city } = useMap();
  const navigate = useNavigate();
  const hasDriverProfile = currentUser.driver_profile?.id;
  const activeDrives =
    currentRole === "passenger"
      ? useTripsList(city)
      : hasDriverProfile
      ? useDriversTripsList(currentUser.driver_profile.id, "active")
      : null;
  console.log(activeDrives);
  return (
    <div className='pt-10 relative flex flex-col justify-center items-center'>
      <CloseBtn onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8'>Активные поездки</h3>
      <div className='flex flex-col gap-4 w-full'>
        {activeDrives.length > 0 ? (
          activeDrives.map((obj) => {
            return (
              <div key={obj.id}>
                <HistoryCard drive={obj} />1
              </div>
            );
          })
        ) : (
          <>Активных поездок сейчас нет</>
        )}
      </div>
    </div>
  );
}
