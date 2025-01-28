import FullScreenList from "../../UI/FullScreenList/FullScreenList";
import CalendarComponent from "../../UI/Calendar/Calendar";
import Profile from "../../UI/Profile/Profile";
import { useModal } from "../../state/ModalStore";
import { useTrip } from "../../state/TripStore";
import Button from "../../UI/Button/Button";
import HistoryCard from "../../UI/HistoryCard/HistoryCard";
import FeedBack from "./FeedBack";
import ProfileModal from "./ProfileModal";
import { useTripsList } from "../../api/api";
import { useMap } from "../../state/MapRoutesStore";

export default function MainModals() {
  const mockDrivers = [
    {
      id: 1,
      name: "Сергей",
      phone: "+7 901 234 56 78",
      avatar: "https://i.pravatar.cc/150?img=1",
      email: "sergey@example.com",
      city: "Москва",
      rating: 4.8,
      comments: ["Отличный водитель!", "Все прошло отлично!", "Рекомендую!"],
    },
    {
      id: 2,
      name: "Василий",
      phone: "+7 902 345 67 89",
      avatar: "https://i.pravatar.cc/150?img=2",
      email: "vasily@example.com",
      city: "Санкт-Петербург",
      rating: 4.6,
      comments: ["Вежливый и пунктуальный.", "Хороший сервис."],
    },
    {
      id: 3,
      name: "Александр",
      phone: "+7 903 456 78 90",
      avatar: "https://i.pravatar.cc/150?img=3",
      email: "alexander@example.com",
      city: "Новосибирск",
      rating: 4.9,
      comments: ["Приятный человек.", "Безопасная и комфортная поездка."],
    },
    {
      id: 4,
      name: "Олег",
      phone: "+7 904 567 89 01",
      avatar: "https://i.pravatar.cc/150?img=4",
      email: "oleg@example.com",
      city: "Екатеринбург",
      rating: 4.5,
      comments: ["Все хорошо, доволен!", "Немного задержался, но в целом ок."],
    },
    {
      id: 5,
      name: "Евгений",
      phone: "+7 905 678 90 12",
      avatar: "https://i.pravatar.cc/150?img=5",
      email: "evgeny@example.com",
      city: "Казань",
      rating: 4.7,
      comments: ["Супер!", "Очень доволен."],
    },
    {
      id: 6,
      name: "Михаил",
      phone: "+7 906 789 01 23",
      avatar: "https://i.pravatar.cc/150?img=6",
      email: "mikhail@example.com",
      city: "Нижний Новгород",
      rating: 4.4,
      comments: ["Профессиональный водитель.", "Хороший сервис."],
    },
    {
      id: 7,
      name: "Дмитрий",
      phone: "+7 907 890 12 34",
      avatar: "https://i.pravatar.cc/150?img=7",
      email: "dmitry@example.com",
      city: "Челябинск",
      rating: 4.2,
      comments: ["Все хорошо, спасибо!", "Могло быть и лучше."],
    },
    {
      id: 8,
      name: "Антон",
      phone: "+7 908 901 23 45",
      avatar: "https://i.pravatar.cc/150?img=8",
      email: "anton@example.com",
      city: "Самара",
      rating: 4.3,
      comments: ["Вовремя приехал, рекомендую.", "Комфортная поездка."],
    },
    {
      id: 9,
      name: "Иван",
      phone: "+7 909 012 34 56",
      avatar: "https://i.pravatar.cc/150?img=9",
      email: "ivan@example.com",
      city: "Омск",
      rating: 4.1,
      comments: ["Средний сервис.", "Есть над чем работать."],
    },
    {
      id: 10,
      name: "Николай",
      phone: "+7 910 123 45 67",
      avatar: "https://i.pravatar.cc/150?img=10",
      email: "nikolay@example.com",
      city: "Ростов-на-Дону",
      rating: 4.0,
      comments: ["В целом хорошо.", "Небольшие недочеты."],
    },
  ];
  const { isDriversOpen, toggleDrivers } = useModal();
  const { isCalendarOpen, toggleCalendar } = useModal();
  const { isPriceOpen, togglePrice } = useModal();
  const { persons, increaseTripPerson, decreaseTripPerson, price, setTripPrice, bookedDrive } = useTrip();
  const { isPersonOpen, togglePersonModal } = useModal();
  const { isActiveDrivesOpen, toggleActiveDrive, isFeedBackOpen, toggleFeedback, isProfileOpen, bookedModal } =
    useModal();
  function CloseCalendar() {
    toggleCalendar(false);
  }

  function closeFeedback() {
    document.body.classList.remove("overflow-y-hidden");
    toggleFeedback(false);
  }

  return (
    <>
      {/* {isDriversOpen && (
        
      )} */}
      {isCalendarOpen && (
        <FullScreenList
          isOpen={isCalendarOpen}
          toggle={CloseCalendar}
          isCreating
          isClose>
          <CalendarComponent />
        </FullScreenList>
      )}
      {isPersonOpen && (
        <FullScreenList
          isCreating
          isNumbers
          isClose
          isOpen={isPersonOpen}
          toggle={() => togglePersonModal(false)}>
          <h3 className='text-left w-[250px] font-bold text-[24px] leading-[25.44px]'>Количество бронируемых мест</h3>
          <div className='flex justify-between items-center w-[350px]'>
            <button
              className='flex items-center justify-center rounded-full w-[34px] h-[34px] border border-[#9B9B9B]'
              onClick={() => decreaseTripPerson()}>
              <svg
                width='26'
                height='2'
                viewBox='0 0 26 2'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1.6665 1H24.3332'
                  stroke='#9B9B9B'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
            <span className='text-[64px] leading-[67.84px]'>{persons}</span>
            <button
              className='flex items-center justify-center rounded-full w-[34px] h-[34px] border border-black'
              onClick={() => increaseTripPerson()}>
              <svg
                width='26'
                height='26'
                viewBox='0 0 26 26'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M12.9998 1.66675V24.3334M1.6665 13.0001H24.3332'
                  stroke='black'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
          <Button
            size={"large"}
            onClick={() => togglePersonModal(false)}>
            Подтвердить
          </Button>
        </FullScreenList>
      )}
      {isPriceOpen && (
        <FullScreenList
          isCreating
          isNumbers
          isClose
          isOpen={isPriceOpen}
          toggle={() => togglePrice(false)}>
          <h3 className='text-left w-[250px] font-bold text-[24px] leading-[25.44px]'>Стоимость поездки</h3>
          <div className='flex justify-center items-center w-[350px]'>
            <input
              type='number'
              className='text-[64px] leading-[67.84px] w-[172px] border-b border-[#CACDD4] bg-inherit outline-none text-center'
              onChange={(e) => setTripPrice(e.target.value)}
              value={price}
            />
          </div>
          <Button
            size={"large"}
            onClick={() => togglePrice(false)}>
            Подтвердить
          </Button>
        </FullScreenList>
      )}
      {/* {activeDrives && activeDrives.length > 0 && isActiveDrivesOpen && (
        
      )} */}
      {isFeedBackOpen && (
        <>
          <div
            className='absolute top-0 left-0 backdrop-blur  h-[30%] block w-full blur-sm z-30'
            onClick={() => closeFeedback()}></div>
          <FeedBack />
        </>
      )}
      {/* {isProfileOpen && <ProfileModal />} */}
    </>
  );
}
