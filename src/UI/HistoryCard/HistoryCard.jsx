import { useModal } from "../../state/ModalStore";
import { useTrip } from "../../state/TripStore";
import { formatDate, getStatus } from "../../utils/utils";
import "./HistoryCard.css";
import { useDriverById } from "../../api/driver";
import { useEffect, useState } from "react";
import { updateTripState } from "../../api/trips";
import { useNavigate } from "react-router-dom";
import { useMap } from "../../state/MapRoutesStore";
import { useUserStore } from "../../state/UserStore";
import { cleanAddress } from "../../api/api";

export default function HistoryCard({ drive }) {
  const { currentUser } = useUserStore();
  const { toggleFeedback, toggleBookedModal } = useModal();
  const { setBookedDrive, setFeedbackTarget } = useTrip();
  const { setIsRouteEnabled } = useMap();
  const [showStartButton, setShowStartButton] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();

  const driverQuery = useDriverById(drive ? drive.driver_id : null, { skip: !drive });
  const driver = driverQuery?.data;

  useEffect(() => {
    if (!drive) return;

    const handleTime = () => {
      if (
        currentUser.driver_profile &&
        currentUser.driver_profile.id === drive.driver_id &&
        drive.state !== "finished"
      ) {
        const departure = new Date(drive.departure_time);
        const startAllowedTime = new Date(departure.getTime() - 10 * 60 * 1000);
        const now = new Date();
        const diff = startAllowedTime - now;

        if (diff <= 0 && drive.state !== "started" && drive.state !== "finished" && drive.state !== "canceled") {
          setShowStartButton(true);
        } else {
          const timer = setTimeout(() => {
            setShowStartButton(true);
          }, diff);
          return () => clearTimeout(timer);
        }
      }
    };

    handleTime();
  }, [drive, currentUser.driver_profile]);

  useEffect(() => {
    if (!drive) return;

    if (drive.state === "started" || drive.state === "finished") return;

    const departureTime = new Date(drive.departure_time);
    const expirationTime = departureTime.getTime() + 15 * 60 * 1000;
    const now = Date.now();

    if (now >= expirationTime) {
      updateTripState(drive.id, "canceled")
        .then(() => {
          setIsExpired(true);
        })
        .catch((error) => {
          console.error("Ошибка при обновлении состояния поездки:", error);
        });
    } else {
      const delay = expirationTime - now;
      const timer = setTimeout(() => {
        updateTripState(drive.id, "canceled")
          .then(() => {
            setIsExpired(true);
          })
          .catch((error) => {
            console.error("Ошибка при обновлении состояния поездки:", error);
          });
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [drive]);
  console.log(drive);

  if (isExpired) {
    return null;
  }

  if (!drive) {
    return null;
  }
  if (!driver) {
    return <div>Loading...</div>;
  }

  function openFeedback(event) {
    event.stopPropagation();
    window.scrollTo(0, 0);
    document.body.classList.add("overflow-y-hidden");
    setFeedbackTarget(drive.driver_id);
    toggleFeedback(true);
  }

  const handleStart = () => {
    setBookedDrive(drive);
    updateTripState(drive.id, "started")
      .then(() => {
        toggleBookedModal(true);
        setIsRouteEnabled(true);
        drive.state = "started";
        navigate("/main");
      })
      .catch((error) => {
        console.error("Ошибка при обновлении состояния поездки:", error);
      });
  };

  function activeClick() {
    if ((drive.state = "started")) {
      setBookedDrive(drive);
      toggleBookedModal(true);
      setIsRouteEnabled(true);
      navigate("/main");
    }
  }
  console.log(drive);

  return (
    <div
      className='history'
      onClick={activeClick}>
      <div className='history-wrapper'>
        <div className='history-path'>
          <span className='history-from'>{cleanAddress(drive.start_address.name)}</span>
          <span className='history-to'>{cleanAddress(drive.end_address.name)}</span>
        </div>
        <div className='history-info'>
          <div className='history-date'>{formatDate(drive.departure_time)}</div>
          <div className='history-driver'>
            <div className='history-rating'>{driver.rating}</div>
            <img
              className='history-img'
              src={driver.user.profile_photo}
              alt='Driver'
            />
          </div>
        </div>
      </div>
      <div className='history-footer'>
        <div className='history-price'>{drive.price} руб</div>
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
      {showStartButton && (
        <div className='start-wrapper'>
          <button
            className='history-start'
            onClick={handleStart}>
            Начать
          </button>
        </div>
      )}
    </div>
  );
}
