import BackButton from "../UI/BackButton";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";
import { useList } from "../state/listStore";
import { renderWaitingItems, renderMainList } from "../utils/renderListUtils.jsx";

export default function PeopleList() {
  const navigate = useNavigate();

  const { mainList, waitingList } = useList();
  const isDriver = useUserStore((state) => state.currentRole === "driver");

  function renderList() {
    if (mainList.length > 0 || waitingList.length > 0) {
      return (
        <>
          {isDriver ? renderWaitingItems(waitingList) : null}
          {renderMainList(mainList, isDriver)}
        </>
      );
    } else {
      return <>Активных водителей сейчас нет</>;
    }
  }

  return (
    <div className='pt-10 relative flex flex-col items-center jc w-full min-h-screen'>
      <BackButton onClick={() => navigate(-1)} />
      <h3 className='font-bold text-[20px] leading-5 pb-8 max-w-[250px]'>
        Список {isDriver ? "пассажиров твоих поездок" : "водителей"}
      </h3>
      <div className='flex flex-col gap-4 w-full justify-center items-center'>
        {mainList ? renderList() : <>Активных водителей сейчас нет</>}
      </div>
    </div>
  );
}
