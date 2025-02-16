import { useNavigate } from "react-router-dom";
import BackButton from "../UI/BackButton";
import { useList } from "../state/listStore";
import { renderHistoryCard } from "../utils/renderListUtils";

export default function HistoryPage() {
  const { historyList } = useList();

  function renderList() {
    return renderHistoryCard(historyList, "История пустая");
  }

  const navigate = useNavigate();
  return (
    <div className='pt-10 relative flex flex-col items-center jc w-full min-h-screen'>
      <BackButton onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8'>История поездок</h3>
      <div className='flex flex-col gap-4 container-custom w-full container-custom px-5'>{renderList()}</div>
    </div>
  );
}
