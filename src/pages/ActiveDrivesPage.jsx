import { useNavigate } from "react-router-dom";
import { useList } from "../state/listStore";
import { renderHistoryCard } from "../utils/renderListUtils.jsx";
import CloseBtn from "../components/NavigationButton/components/CloseBtn/CloseBtn.jsx";

export default function ActiveDrivesPage() {
  const { activeList } = useList();
  const navigate = useNavigate();
  function renderList() {
    return renderHistoryCard(activeList, "У вас сейчас нет активных поездок");
  }
  return (
    <div className='pt-10 relative flex flex-col justify-center items-center'>
      <CloseBtn onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8'>Активные поездки</h3>
      <div className='flex flex-col gap-4 w-full items-center justify-center'>{renderList()}</div>
    </div>
  );
}
