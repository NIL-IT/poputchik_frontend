import { useUserById } from "../../api/api";
import { useModal } from "../../state/ModalStore";
import { useTrip } from "../../state/TripStore";
import { formatDate, getStatus } from "../../utils/utils";
import "./HistoryCard.css";
export default function HistoryCard({ drive }) {
  const { toggleFeedback, toggleActiveDrive, toggleBookedModal } = useModal();
  const { setBookedDrive, bookedDrive } = useTrip();
  function openFeedback(event) {
    event.stopPropagation();
    window.scrollTo(0, 0);
    document.body.classList.add("overflow-y-hidden");
    toggleFeedback(true);
  }
  const driver = useUserById(drive.driver_id).data;
  function chooseDrive(event) {
    if (drive.state == "active") {
      setBookedDrive(drive);
      toggleActiveDrive(false);
      toggleBookedModal(true);
      event.stopPropagation();
    }
  }

  if (!drive || !driver) {
    return null;
  }
  return (
    <div
      className='history'
      onClick={() => chooseDrive()}>
      <div className='history-wrapper'>
        <div className='history-path'>
          <span className='history-from'>{drive.start_address.name}</span>
          <span className='history-to'>{drive.end_address.name}</span>
        </div>
        <div className='history-info'>
          <div className='history-date'>{formatDate(drive.departure_time)}</div>
          <div className='history-driver'>
            <div className='history-rating'>123</div>
            <img
              className='history-img'
              src={driver.profile_photo}
            />
          </div>
        </div>
      </div>
      <div className='history-footer'>
        <div className='history-price'>{drive.price}руб</div>
        <span onClick={openFeedback}>
          <svg
            width='22'
            height='20'
            viewBox='0 0 22 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M14.135 10.5C14.015 10.5 13.89 10.48 13.77 10.44C13.5446 10.3683 13.3481 10.2261 13.2095 10.0344C13.0709 9.8427 12.9974 9.61156 13 9.375V7.97C11.87 7.79 11 6.805 11 5.625V2.375C11 1.065 12.065 0 13.375 0H19.125C20.435 0 21.5 1.065 21.5 2.375V5.625C21.5 6.935 20.435 8 19.125 8H16.565L15.025 10.05C14.805 10.34 14.48 10.5 14.135 10.5ZM7 11.75C4.93 11.75 3.25 10.07 3.25 8C3.25 5.93 4.93 4.25 7 4.25C9.07 4.25 10.75 5.93 10.75 8C10.75 10.07 9.07 11.75 7 11.75ZM0.5 15.395C0.5 15.44 0.575 20 7 20C13.425 20 13.5 15.44 13.5 15.395V14.875C13.5 13.84 12.66 13 11.625 13H2.375C1.34 13 0.5 13.84 0.5 14.875V15.395Z'
              fill='#EF7828'
            />
          </svg>
        </span>
        <div className='history-status'>{getStatus(drive.state)}</div>
      </div>
    </div>
  );
}
