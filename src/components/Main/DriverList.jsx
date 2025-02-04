import { useNavigate } from "react-router-dom";
import { useDriversTripsList, useTripsList } from "../../api/trips";
import { useUserStore } from "../../state/UserStore";
import Button from "../../UI/Button/Button";
import Footer from "../../UI/Footer/Footer";
import Profile from "../../UI/Profile/Profile";

export default function DriverList({ list, toggleCreating }) {
  const { currentRole, currentUser } = useUserStore();
  const hasDriverProfile = currentUser.driver_profile?.id;
  const navigate = useNavigate();
  const activeDrives =
    currentRole === "passenger"
      ? useTripsList(currentUser.city)
      : hasDriverProfile
      ? useDriversTripsList(currentUser.driver_profile.id, "active")
      : null;
  return (
    <Footer className={`bg-[#F6F6F6] flex items-center justify-center`}>
      <h2 className='font-bold text-[20px] leading-[20px] pb-5 '>
        Список {currentRole === "passenger" ? "водителей" : "пассажиров"}
      </h2>
      <div className='flex flex-col items-center justify-center gap-4 pb-4'>
        {list.map((obj) => {
          return (
            <Profile
              key={obj.id}
              driver={obj}
            />
          );
        })}
      </div>
      <div
        className='flex max-w-[350px] justify-end items-end text-right text-[14px] leading-[16.1px] margin-[0 auto] pb-4'
        onClick={() => navigate("/peopleList")}>
        <p className='pr-5'>Смотреть весь список</p>
        <svg
          width='19'
          height='16'
          viewBox='0 0 19 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M17.7076 8.70755L17.7081 8.70705L18.0611 8.354L17.9664 8.25925C18.0117 8.08961 18.0117 7.91038 17.9664 7.74074L18.0611 7.646L17.7081 7.29294L17.7076 7.29244L17.3545 6.93839L17.354 6.93889L12.0616 1.64644C11.6708 1.25567 11.0372 1.25567 10.6465 1.64644C10.2557 2.03721 10.2557 2.67078 10.6465 3.06155L10.9859 2.72214L10.6465 3.06155L14.5849 7L2.50003 7H2.00003H1.50003V7.13397C1.42498 7.17729 1.35526 7.23055 1.29292 7.29289C1.10538 7.48043 1.00003 7.73478 1.00003 8C1.00003 8.26521 1.10538 8.51957 1.29292 8.7071C1.35526 8.76944 1.42498 8.8227 1.50003 8.86602V9H2.00003H2.50003H14.5849L10.6465 12.9384C10.2557 13.3292 10.2557 13.9628 10.6465 14.3535C11.0372 14.7443 11.6708 14.7443 12.0616 14.3535L17.354 9.0611L17.3545 9.0616L17.7076 8.70755Z'
            fill='black'
            stroke='white'
          />
        </svg>
      </div>
      <div className='flex justify-center items-center gap-5 pb-6'>
        <div className='relative'>
          <Button
            size={currentRole == "driver" ? "medium" : "large"}
            onClick={() => navigate("/activeDrives")}>
            Активные поездки
          </Button>
          <span className='absolute w-4 h-4 border-[2px] border-white bg-[#FF2C20] text-white rounded-full text-[12px] leading-4 flex items-center justify-center -right-2 -top-2'>
            {activeDrives ? activeDrives.filter((i) => i.driver_id !== currentUser.driver_profile.id).length : 0}
          </span>
        </div>
        {currentRole === "driver" && (
          <Button
            size={"medium"}
            onClick={() => toggleCreating()}>
            Создать поездку
          </Button>
        )}
      </div>
    </Footer>
  );
}
