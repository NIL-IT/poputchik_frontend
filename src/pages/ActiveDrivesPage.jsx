import FullScreenList from "../UI/FullScreenList/FullScreenList";
import { useTripsList } from "../api/api";
import { useMap } from "../state/MapRoutesStore";
import HistoryCard from "../UI/HistoryCard/HistoryCard";
import CloseBtn from "../UI/CloseBtn";
import { useNavigate } from "react-router-dom";

export default function ActiveDrivesPage() {
  const { city } = useMap();
  const navigate = useNavigate();
  const activeDrives = useTripsList(city);

  return (
    <div className='pt-10 relative'>
      <CloseBtn onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8'>Активные поездки</h3>
      <div className='flex flex-col gap-4 w-full'>
        {activeDrives ? (
          activeDrives.map((obj) => {
            return (
              <HistoryCard
                key={obj.id}
                drive={obj}
              />
            );
          })
        ) : (
          <>Активных поездок сейчас нет</>
        )}
      </div>
    </div>
  );
}
