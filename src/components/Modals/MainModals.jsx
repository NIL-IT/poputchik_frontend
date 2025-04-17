import { useModal } from "../../state/ModalStore";
import { useTrip } from "../../state/TripStore";
import FeedBack from "./FeedBack";
import CarModal from "./CarModal";
import FilterModal from "./FilterModal";
import AnimatedModal from "../Wrappers/AnimatedModal";
import { modalSlideUp, modalFade } from "../../utils/animation";
import FullScreenList from "./components/FullScreenList/FullScreenList";
import CalendarComponent from "./components/Calendar/Calendar";
import Button from "../Button/Button";

export default function MainModals() {
  const { isCalendarOpen, toggleCalendar } = useModal();
  const { persons, increaseTripPerson, decreaseTripPerson } = useTrip();
  const { isPersonOpen, togglePersonModal, toggleCarModal } = useModal();
  const {
    isFeedBackOpen,
    toggleFeedback,

    carModal,
    isFilterModalOpen,
    setFilterModalOpen,
  } = useModal();
  function CloseCalendar() {
    toggleCalendar(false);
  }

  function closeFilter() {
    document.body.classList.remove("overflow-y-hidden");
    setFilterModalOpen(false);
  }

  function closeFeedback() {
    document.body.classList.remove("overflow-y-hidden");
    toggleFeedback(false);
  }

  return (
    <>
      {isCalendarOpen && (
        <AnimatedModal
          isOpen={isCalendarOpen}
          onClose={CloseCalendar}
          variants={modalSlideUp}
          modalType='fullscreen'>
          <FullScreenList
            isOpen={isCalendarOpen}
            toggle={CloseCalendar}
            isCreating
            isClose>
            <CalendarComponent />
          </FullScreenList>
        </AnimatedModal>
      )}

      {isPersonOpen && (
        <AnimatedModal
          isOpen={isPersonOpen}
          onClose={() => togglePersonModal(false)}
          variants={modalFade}
          modalType='center'>
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
        </AnimatedModal>
      )}

      {isFeedBackOpen && (
        <AnimatedModal
          isOpen={isFeedBackOpen}
          onClose={closeFeedback}
          variants={modalSlideUp}
          modalType='bottom'>
          <FeedBack />
        </AnimatedModal>
      )}

      {carModal && (
        <AnimatedModal
          isOpen={carModal}
          onClose={() => toggleCarModal(false)}
          variants={modalFade}
          modalType='center'>
          <CarModal />
        </AnimatedModal>
      )}

      {isFilterModalOpen && (
        <AnimatedModal
          isOpen={isFilterModalOpen}
          onClose={closeFilter}
          variants={modalSlideUp}
          modalType='center'>
          <FilterModal onClose={closeFilter} />
        </AnimatedModal>
      )}
    </>
  );
}
