import BackButton from "../UI/BackButton";
import Button from "../UI/Button/Button";
import HistoryCard from "../UI/HistoryCard/HistoryCard";
import FullScreenList from "../UI/FullScreenList/FullScreenList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";

import { useModal } from "../state/ModalStore";
import UserInfo from "../components/UserInfo";
import FeedBack from "../components/Modals/FeedBack";

export default function UserPage() {
  const navigate = useNavigate();
  const { changeCurrentRole } = useUserStore();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { isFeedBackOpen } = useModal();

  function toggleHistory() {
    setIsHistoryOpen((prev) => !prev);
  }

  function toSelectRole() {
    navigate("/");
    changeCurrentRole("");
  }

  return (
    <div className=''>
      <div className='container-custom relative'>
        <div className='pt-8 pb-10 px-5 border-b border-[#919191] '>
          <BackButton />

          <UserInfo />
          <div className='flex gap-5'>
            <Button size={"medium"}>Редактировать</Button>
            <Button
              onClick={toSelectRole}
              size={"medium"}
              classNames={"black"}>
              Выйти
            </Button>
          </div>
        </div>
        <div className='p-5'>
          <div className='font-bold text-[20px] leading-5 mb-6 relative'>
            <h2>История поездок</h2>
            <button
              onClick={toggleHistory}
              className='absolute right-0 -top-2 w-10 h-10 rounded-full bg-[#EF7828] flex justify-center items-center'>
              <svg
                width='19'
                height='16'
                viewBox='0 0 19 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M17.7076 8.70755L17.7081 8.70705L18.0611 8.354L17.9664 8.25925C18.0117 8.08961 18.0117 7.91038 17.9664 7.74074L18.0611 7.646L17.7081 7.29294L17.7076 7.29244L17.3545 6.93839L17.354 6.93889L12.0616 1.64644C11.6708 1.25567 11.0372 1.25567 10.6465 1.64644C10.2557 2.03721 10.2557 2.67078 10.6465 3.06155L10.9859 2.72214L10.6465 3.06155L14.5849 7L2.50003 7H2.00003H1.50003V7.13397C1.42498 7.17729 1.35526 7.23055 1.29292 7.29289C1.10538 7.48043 1.00003 7.73478 1.00003 8C1.00003 8.26521 1.10538 8.51957 1.29292 8.7071C1.35526 8.76944 1.42498 8.8227 1.50003 8.86602V9H2.00003H2.50003H14.5849L10.6465 12.9384C10.2557 13.3292 10.2557 13.9628 10.6465 14.3535C11.0372 14.7443 11.6708 14.7443 12.0616 14.3535L17.354 9.0611L17.3545 9.0616L17.7076 8.70755Z'
                  fill='white'
                  stroke='white'
                />
              </svg>
            </button>
          </div>
          {/* <HistoryCard drive={mock[0]} /> */}
        </div>
      </div>
      {/* <FullScreenList
        isOpen={isHistoryOpen}
        toggle={toggleHistory}>
        <h3 className='font-bold text-[20px] leading-5 pb-8'>История поездок</h3>
        <div className='flex flex-col gap-4 container-custom w-full container-custom px-5'>
          {mock.map((obj) => {
            return (
              <HistoryCard
                key={obj.id}
                drive={obj}
              />
            );
          })}
        </div>
      </FullScreenList> */}
      {isFeedBackOpen && (
        <>
          <div className='absolute top-0 left-0 backdrop-blur  h-[30%] block w-full blur-sm'></div>
          <FeedBack />
        </>
      )}
    </div>
  );
}
