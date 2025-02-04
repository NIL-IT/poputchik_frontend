import { useNavigate } from "react-router-dom";
import BackButton from "../UI/BackButton";
import HistoryCard from "../UI/HistoryCard/HistoryCard";
import { useUserStore } from "../state/UserStore";
import { usePassengerTripsList, useDriversTripsList } from "../api/trips";

export default function HistoryPage() {
  const { currentRole, currentUser } = useUserStore();
  const hasDriverProfile = currentUser.driver_profile?.id;

  const historyList =
    currentRole === "passenger"
      ? usePassengerTripsList(currentUser.passenger_profile.id, "finished")
      : hasDriverProfile
      ? useDriversTripsList(currentUser.driver_profile.id, "finished")
      : [];
  const navigate = useNavigate();
  return (
    <div className='pt-10 relative flex flex-col items-center jc w-full min-h-screen'>
      <BackButton onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8'>История поездок</h3>
      <div className='flex flex-col gap-4 container-custom w-full container-custom px-5'>
        {historyList && historyList.length ? (
          historyList.map((obj) => {
            return (
              <HistoryCard
                key={obj.id}
                drive={obj}
              />
            );
          })
        ) : (
          <>История пустая</>
        )}
      </div>
    </div>
  );
}
