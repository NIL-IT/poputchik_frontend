import { useNavigate } from "react-router-dom";
import CloseBtn from "../components/NavigationButton/components/CloseBtn/CloseBtn.jsx";
import { useUserStore } from "../state/UserStore";
import { renderMainList } from "../utils/renderListUtils.jsx";
import { useList } from "../state/listStore.js";

export default function ChatList() {
  const isDriver = useUserStore((state) => state.currentRole === "driver");
  const { activeList, passengersList } = useList();

  function renderList() {
    const listToRender = isDriver ? passengersList : activeList;
    if (listToRender.length > 0){
    return renderMainList(isDriver, listToRender, true, true);
    } else {
      return <>У вас нет активных чатов</>
    }
  }

  const navigate = useNavigate();
  return (
    <div className='flex flex-col min-h-screen mx-auto'>
      <CloseBtn
        className='absolute top-[110px]  right-5 w-11 h-11 rounded-full flex justify-center items-center bg-[#fff] shadow-btnback z-10'
        onClick={() => navigate(-1)}
      />
      <div className='pt-[140px] pb-[50px] bg-orange-500 text-white px-8 text-[32px] leading-8 font-semibold'>Чаты</div>
      <div className='container-custom flex flex-col gap-4 pb-5'>{renderList()}</div>
    </div>
  );
}
