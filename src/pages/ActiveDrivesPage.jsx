import { useDriversTripsList, useTripsList } from "../api/trips";
import HistoryCard from "../UI/HistoryCard/HistoryCard";
import CloseBtn from "../UI/CloseBtn";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";
import { useBookedTripsList } from "../api/passenger";

export default function ActiveDrivesPage() {
  const { currentRole, currentUser } = useUserStore();
  const navigate = useNavigate();
  const hasDriverProfile = currentUser.driver_profile?.id;

  const activeTrips = hasDriverProfile ? useDriversTripsList(currentUser.driver_profile.id, "active") || [] : [];

  const startedTrips = hasDriverProfile ? useDriversTripsList(currentUser.driver_profile.id, "started") || [] : [];

  const bookedTrips = hasDriverProfile ? useDriversTripsList(currentUser.driver_profile.id, "booked") || [] : [];

  const activeDrives =
    currentRole === "passenger"
      ? useBookedTripsList(currentUser.passenger_profile.id)
      : hasDriverProfile
      ? [...activeTrips, ...startedTrips, ...bookedTrips]
      : [];

  const filteredDrives = activeDrives?.filter((i) => i.driver_id !== currentUser.driver_profile?.id) || [];
  function renderList() {
    if (currentRole === "passenger") {
      return filteredDrives.length ? (
        filteredDrives.map((obj) => {
          return (
            <div key={obj.id}>
              <HistoryCard drive={obj} />
            </div>
          );
        })
      ) : (
        <>Активных поездок сейчас нет</>
      );
    } else {
      return activeDrives.length ? (
        activeDrives.map((obj) => {
          return (
            <div key={obj.id}>
              <HistoryCard drive={obj} />
            </div>
          );
        })
      ) : (
        <>Активных поездок сейчас нет</>
      );
    }
  }
  return (
    <div className='pt-10 relative flex flex-col justify-center items-center'>
      <CloseBtn onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8'>Активные поездки</h3>
      <div className='flex flex-col gap-4 w-full items-center justify-center'>{renderList()}</div>
    </div>
  );
}
