import FullScreenList from "../../UI/FullScreenList/FullScreenList";
import CalendarComponent from "../../UI/Calendar/Calendar";
import { useModal } from "../../state/ModalStore";
import { useTrip } from "../../state/TripStore";
import Button from "../../UI/Button/Button";
import FeedBack from "./FeedBack";
import FeedbackSummary from "./FeedbackSummary";
import CarModal from "./CarModal";

export default function MainModals() {
  const { isCalendarOpen, toggleCalendar } = useModal();
  const { isPriceOpen, togglePrice } = useModal();
  const { persons, increaseTripPerson, decreaseTripPerson, price, setTripPrice, bookedDrive } = useTrip();
  const { isPersonOpen, togglePersonModal } = useModal();
  const { isFeedBackOpen, toggleFeedback, bookedModal, isFeedbackSummaryOpen, setIsFeedbackSummaryOpen, carModal } =
    useModal();
  function CloseCalendar() {
    toggleCalendar(false);
  }

  function closeFeedback() {
    document.body.classList.remove("overflow-y-hidden");
    toggleFeedback(false);
  }

  function closeFeedbackSumamry() {
    document.body.classList.remove("overflow-y-hidden");
    setIsFeedbackSummaryOpen(false);
  }

  return (
    <>
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

      {isFeedBackOpen && (
        <>
          <FeedBack />
        </>
      )}
      {carModal && (
        <>
          <CarModal />
        </>
      )}
    </>
  );
}
