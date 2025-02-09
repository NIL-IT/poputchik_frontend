import { useEffect, useState } from "react";
import { useTrip } from "../../state/TripStore";
import Button from "../../UI/Button/Button";
import Footer from "../../UI/Footer/Footer";
import { useMap } from "../../state/MapRoutesStore";
import { useUserStore } from "../../state/UserStore";
import { useModal } from "../../state/ModalStore";
import { useDriverById } from "../../api/driver";
import { bookedTripByPassenger, tripRequestByPassenger, updateTripState } from "../../api/trips";
import { cleanAddress } from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function DriveInfo() {
  const { currentUser, currentRole } = useUserStore();
  const { bookedDrive, setFeedbackTarget } = useTrip();
  const { toggleBookedModal, toggleFeedback, setCarPhoto, toggleCarModal } = useModal();
  const { setIsRouteEnabled, isRouteEnabled, setStartPoint, setEndPoint } = useMap();
  const navigate = useNavigate();
  const data = useDriverById(bookedDrive.driver_id).data;
  const driver = data.user;
  const rating = data.rating;
  const carPhoto = driver.driver_profile.car_photo;

  const [text, setText] = useState("");

  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);

  function bookingByPassenger(e) {
    e.preventDefault();
    const formData = {
      trip_id: bookedDrive.id,
      passenger_id: currentUser.passenger_profile.id,
      text: text,
      seats_requested: 1,
    };
    tripRequestByPassenger(formData);
    toggleBookedModal(false);
  }

  function openFeedback(event) {
    event.stopPropagation();
    window.scrollTo(0, 0);
    document.body.classList.add("overflow-y-hidden");
    setFeedbackTarget(driver.driver_id);
    toggleFeedback(true);
  }

  useEffect(() => {
    if (!bookedDrive || !bookedDrive.start_address || !bookedDrive.end_address) return;

    const start = bookedDrive.start_address.coordinates;
    const end = bookedDrive.end_address.coordinates;

    setStartPoint([start.latitude, start.longitude]);
    setEndPoint([end.latitude, end.longitude]);
    setIsRouteEnabled(true);
  }, [bookedDrive]);

  useEffect(() => {
    return () => {
      setIsRouteEnabled(false);
      setStartPoint(null);
      setEndPoint(null);
    };
  }, []);

  function finishDrive() {
    updateTripState(bookedDrive.id, "finished");
    toggleBookedModal(false);
  }

  function renderButton() {
    if (currentRole === "driver" && bookedDrive.state === "started") {
      return (
        <Button
          onClick={finishDrive}
          size={"large"}>
          Закончить
        </Button>
      );
    } else if (currentRole === "passenger" && bookedDrive.state !== "started") {
      if (!isTextAreaVisible) {
        return (
          <Button
            onClick={() => setIsTextAreaVisible(true)}
            size={"large"}>
            Забронировать
          </Button>
        );
      } else {
        return (
          <div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Введите комментарий (необязательно)'
              className='w-full p-2 border rounded mb-4'
            />
            <Button
              onClick={bookingByPassenger}
              size={"large"}>
              Подтвердить бронь
            </Button>
          </div>
        );
      }
    } else if (currentRole === "passenger" && bookedDrive.state === "started") {
      return (
        <Button
          onClick={() => {}}
          size={"large"}>
          Оплатить
        </Button>
      );
    }
  }

  function openCarModal() {
    setCarPhoto(carPhoto);
    toggleCarModal(true);
  }

  console.log(driver);
  return (
    <Footer className={"bg-[#f6f6f6] w-full z-10 flex flex-col items-center "}>
      <div className=''>
        <div className='w-full flex justify-between py-5 border-b border-[#EFEFF4]'>
          <div className='flex text-left'>
            <img
              className='w-[50px] h-[50px] rounded-full mr-4'
              src={driver.profile_photo}
            />
            <div className='text-[#343B71] font-medium text-[17px] leading-5'>
              <h3 className='pb-3'>{driver.name}</h3>
              <div>
                <p className='profile-stars'>{rating}</p>
              </div>
            </div>
          </div>
          {currentRole === "passenger" && (
            <div className='flex gap-4'>
              <button
                className='w-10 h-10 bg-[#007BFF] rounded-full flex justify-center items-center'
                onClick={() => navigate(`/chat/${bookedDrive.id}/${currentUser.id}`)}>
                {/* svg-иконка чата */}
              </button>
              <button
                className='w-10 h-10 bg-[#4CE5B1] rounded-full flex justify-center items-center'
                onClick={() => (window.location.href = `tel:${driver.phone_number}`)}>
                {/* svg-иконка телефона */}
              </button>
            </div>
          )}
        </div>
        <div className='border-b border-[#EFEFF4]'>
          <div className='history-path my-5'>
            <span className='history-from'>{cleanAddress(bookedDrive.start_address.name)}</span>
            <span className='history-to'>{cleanAddress(bookedDrive.end_address.name)}</span>
          </div>
        </div>
        {bookedDrive.state === "started" && (
          <div className='py-4 border-b border-[#EFEFF4]'>
            <button className='w-full flex justify-between items-center'>
              {currentRole === "passenger" && (
                <div
                  className='flex flex-col justify-center items-center py-4 border rounded-2xl border-black w-[150px] h-[104px]'
                  onClick={openFeedback}>
                  <span className='text-[#242E42] text-[17px] leading-5 font-bold'>Оставить отзыв</span>
                </div>
              )}
              <div className='flex flex-col justify-center items-center py-4 border rounded-2xl border-black w-[150px] h-[104px]'>
                <span className='text-[#242E42] text-[17px] leading-5 font-bold'>Поездка не оплачена</span>
              </div>
            </button>
          </div>
        )}
        <div className='w-full flex justify-between py-5 border-b border-[#EFEFF4]'>
          <div className='mr-10'>
            <svg
              onClick={openCarModal}
              width='62'
              height='36'
              viewBox='0 0 62 36'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M21.8453 0.0740337C20.259 0.289339 18.491 1.04291 17.0016 2.14335C16.275 2.69358 15.7301 3.35145 12.8965 7.04752L9.62695 11.3297L8.29492 12.2029C6.30898 13.4828 3.40273 15.5999 2.78516 16.2219C1.59844 17.3822 0.653906 19.0807 0.242188 20.8031C0.0363281 21.6524 0 22.2146 0 25.0614C0 28.2072 0.0121094 28.3508 0.266406 28.7933C0.653906 29.4871 1.28359 29.7383 2.56719 29.7383H3.60859L3.69336 28.9249C3.89922 27.047 4.72266 25.3365 6.07891 24.0088C7.04766 23.0519 8.07695 22.4299 9.38477 21.9993C10.2203 21.7241 10.5594 21.6883 11.8672 21.6883C13.2234 21.6763 13.4898 21.7122 14.398 22.0232C17.5707 23.0877 19.5687 25.6236 20.041 29.1641L20.1137 29.7383H31H41.8863L41.959 29.1641C42.1285 27.8364 42.3344 27.1068 42.843 26.114C43.7996 24.2121 45.5434 22.7169 47.602 22.0232C48.5102 21.7122 48.7766 21.6763 50.1328 21.6883C51.4406 21.6883 51.7797 21.7241 52.6152 21.9993C53.923 22.4299 54.9645 23.0638 55.9332 24.0207C57.2895 25.3604 58.1008 27.0589 58.3066 28.9369L58.3914 29.7383H59.4328C60.7164 29.7383 61.3461 29.4871 61.7336 28.7933C62 28.3388 62 28.2431 62 23.5542V18.7816L60.7891 11.1981C60.123 7.03556 59.5902 3.62657 59.6023 3.6146C60.0746 3.44715 60.6074 3.05242 60.7891 2.76535C61.3098 1.94001 60.9828 0.672102 60.1473 0.217569C59.784 0.0261879 58.5246 0.0142269 41.1719 0.00226593C30.9516 -0.00969696 22.257 0.0261879 21.8453 0.0740337ZM27.0039 3.87776C27.0039 3.99737 26.7859 5.63608 26.5074 7.50206C25.9383 11.4613 25.8414 11.7125 24.7152 12.2986L24.0734 12.6335H18.6969C15.7422 12.6335 13.3203 12.5976 13.3203 12.5498C13.3203 12.3823 18.5879 5.55235 19.0238 5.16959C19.5203 4.71505 20.707 4.0811 21.4941 3.82991C21.8211 3.73422 22.8141 3.67441 24.4973 3.67441C26.8465 3.66245 27.0039 3.67441 27.0039 3.87776Z'
                fill='#242E42'
                fillOpacity='1'
              />
              <path
                d='M10.5958 23.5296C9.50592 23.7449 8.24655 24.4387 7.37467 25.2999C3.37858 29.2472 6.16374 35.9695 11.7946 35.9814C13.054 35.9814 13.8169 35.802 14.9188 35.2159C18.1399 33.5174 19.1934 29.2831 17.1469 26.2329C16.0208 24.5583 14.2286 23.5655 12.17 23.4579C11.6372 23.4339 10.9348 23.4579 10.5958 23.5296ZM12.5333 27.1181C13.1751 27.2736 13.9743 27.9195 14.2891 28.5534C14.7856 29.4864 14.5192 30.9457 13.7321 31.6753C12.9692 32.3811 11.5766 32.5964 10.6684 32.1299C9.96608 31.783 9.36061 31.0175 9.19108 30.2759C8.90045 28.9721 9.71178 27.5606 10.9833 27.1779C11.7098 26.9626 11.8672 26.9506 12.5333 27.1181Z'
                fill='#242E42'
                fillOpacity='1'
              />
              <path
                d='M48.9825 23.518C45.943 24.128 43.8239 26.6519 43.8118 29.6781C43.8118 30.9101 43.9934 31.6637 44.5868 32.7522C46.0036 35.3717 49.3336 36.6516 52.1915 35.6708C54.4196 34.9172 55.909 33.1947 56.3934 30.8503C57.2774 26.6519 53.245 22.6807 48.9825 23.518ZM50.9684 27.1782C52.7969 27.7045 53.475 29.9652 52.2278 31.4005C51.6465 32.0704 51.029 32.3694 50.1934 32.3694C48.5708 32.3694 47.4809 31.2929 47.4688 29.702C47.4688 28.8528 47.7594 28.2547 48.4497 27.6686C49.2125 27.0107 49.9391 26.8672 50.9684 27.1782Z'
                fill='#242E42'
                fillOpacity='1'
              />
            </svg>
          </div>
          <div className='flex justify-between w-full font-bold text-[16px] leading-[18.4px] text-[#242E42]'>
            <div className='flex flex-col'>
              <span className='pb-1 text-[#C8C7CC]'>Дистанция</span>
              <span>{bookedDrive.distance}</span>
            </div>
            <div className='flex flex-col'>
              <span className='pb-1 text-[#C8C7CC]'>Время</span>
              <span>{bookedDrive.travel_time}</span>
            </div>
            <div className='flex flex-col'>
              <span className='pb-1 text-[#C8C7CC]'>Цена</span>
              <span>{bookedDrive.price}</span>
            </div>
          </div>
        </div>
        {renderButton()}
      </div>
    </Footer>
  );
}
