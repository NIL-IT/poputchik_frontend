import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../state/UserStore.js";
import Button from "../Button/Button.jsx";
import Footer from "../Footer/Footer.jsx";
import { renderWaitingItems, renderMainList } from "../../utils/renderListUtils.jsx";
import { useList } from "../../state/listStore.js";
import PropTypes from "prop-types";
import { useModal } from "../../state/ModalStore.js";

export default function DriverList({ toggleCreating }) {
  const { initialized } = useList();
  console.log(initialized)
  const { currentUser } = useUserStore();
  const navigate = useNavigate();
  const { setFilterModalOpen } = useModal();
  const isDriver = useUserStore((state) => state.currentRole === "driver");
  const { passengersList, activeList, waitingList, filteredList, isFiltered, driveList } = useList();
  const driverId = currentUser.driver_profile ? currentUser.driver_profile.id : null;
  const filteredDrives = activeList?.filter((i) => (driverId ? i.driver_id !== driverId : true));

  function renderLength() {
    if (activeList) {
      return isDriver ? activeList.length : filteredDrives.length;
    }
    return 0;
  }

  function renderList() {
    const listToRender = isFiltered ? filteredList : isDriver ? passengersList : driveList;
    if (!Array.isArray(listToRender) || listToRender.length === 0) {
      return <>Список пустой</>;
    }

    const currentDate = new Date();

    const filteredListToRender = listToRender.filter((trip) => {
      if (isDriver) {
        if (Array.isArray(trip.booked_trips)) {
          return trip.booked_trips.some((item) => {
            const tripDate = new Date(item.departure_time);
            return tripDate >= currentDate;
          });
        }
        return new Date(trip.departure_time) >= currentDate;
      } else {
        return new Date(trip.departure_time) >= currentDate;
      }
    });

    console.log(filteredListToRender);
    const waitingItems = isDriver ? renderWaitingItems(waitingList) : [];
    const mainItems = renderMainList(isDriver, filteredListToRender);

    const allItems = isDriver ? [...waitingItems, ...mainItems] : [...waitingItems, ...mainItems].slice(0, 2);

    return allItems.length > 0 ? allItems : <>Список пустой</>;
  }

  function openFilter() {
    document.body.classList.add("overflow-y-hidden");
    setFilterModalOpen(true);
  }
  return (
    <Footer className={`bg-[#F6F6F6] flex justify-center`}>
      <div className='w-full h-full flex flex-col justify-between relative no-scrollbar'>
        <h2 className='font-bold text-[20px] leading-[20px] pb-5 '>Список {!isDriver ? "водителей" : "пассажиров"}</h2>
        <button
          className={`absolute right-0 top-0 w-[35px] h-[35px] flex justify-center items-center border border-[#323232] rounded-[12px] cursor-pointer ${
            isFiltered ? "bg-[#EF7828]" : "bg-white"
          }`}
          onClick={openFilter}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'>
            <path
              opacity='0.1'
              d='M14.8333 1.5H3.16667C2.24619 1.5 1.5 2.24619 1.5 3.16667V4.14298C1.5 4.58501 1.67559 5.00893 1.98816 5.32149L6.84518 10.1785C7.15774 10.4911 7.33333 10.915 7.33333 11.357V15.6667V15.9048C7.33333 16.4319 7.97075 16.6959 8.3435 16.3232L9 15.6667L10.1785 14.4882C10.4911 14.1756 10.6667 13.7517 10.6667 13.3097V11.357C10.6667 10.915 10.8422 10.4911 11.1548 10.1785L16.0118 5.32149C16.3244 5.00893 16.5 4.58501 16.5 4.14298V3.16667C16.5 2.24619 15.7538 1.5 14.8333 1.5Z'
              fill='#323232'
            />
            <path
              d='M14.8333 1.5H3.16667C2.24619 1.5 1.5 2.24619 1.5 3.16667V4.14297C1.5 4.58501 1.67559 5.00893 1.98816 5.32149L6.84518 10.1785C7.15774 10.4911 7.33333 10.915 7.33333 11.357V15.6667V15.9048C7.33333 16.4319 7.97075 16.6959 8.3435 16.3232L9 15.6667L10.1785 14.4882C10.4911 14.1756 10.6667 13.7517 10.6667 13.3097V11.357C10.6667 10.915 10.8422 10.4911 11.1548 10.1785L16.0118 5.32149C16.3244 5.00893 16.5 4.58501 16.5 4.14297V3.16667C16.5 2.24619 15.7538 1.5 14.8333 1.5Z'
              stroke='#323232'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
        <div className='flex flex-col items-center justify-center gap-4 pb-4'>{renderList()}</div>

        <div className='flex flex-col  gap-5 pb-6'>
          <div
          aria-disabled={!initialized}
            className='flex max-w-[350px] justify-end items-end  '
            onClick={() => navigate("/peopleList")}>
            <div className='flex  p-4 bg-[#EF7828] rounded-[8px] text-white cursor-pointer'>
              <p className='pr-5'>Смотреть весь список</p>
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
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='relative'>
              <Button
                disabled={!initialized}
                size={"medium"}
                onClick={() => navigate("/activeDrives")}>
                Активные поездки
              </Button>
              <span className='absolute w-4 h-4 border-[2px] border-white bg-[#FF2C20] text-white rounded-full text-[12px] leading-4 flex items-center justify-center -right-1 -top-2'>
                {renderLength()}
              </span>
            </div>

            <Button
              disabled={!initialized}
              size={"medium"}
              onClick={() => toggleCreating()}>
              Создать поездку
            </Button>
          </div>
        </div>
      </div>
    </Footer>
  );
}

DriverList.propTypes = {
  toggleCreating: PropTypes.func.isRequired,
};
