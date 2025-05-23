import goodReviewImg from "../../assets/icons/reviewCheck.png";
import { useEffect, useState } from "react";
import { useTrip } from "../../state/TripStore";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import { useMap } from "../../state/MapRoutesStore";
import { useUserStore } from "../../state/UserStore";
import { useModal } from "../../state/ModalStore";
import { useDriverById } from "../../api/driver";
import { bookedTripByDriver, tripRequestByPassenger, updateTripState, useTripById } from "../../api/trips";
import { cleanAddress } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { useUserByUserId } from "../../api/user";
import { useList } from "../../state/listStore";
import { payment } from "../../api/payment";
import { checkPaymenst, checkTripState } from "../../utils/payments";

export default function DriveInfo() {
  const { currentUser, currentRole } = useUserStore();
  const { bookedDrive, setFeedbackTarget } = useTrip();
  const { toggleBookedModal, toggleFeedback, setCarPhoto, toggleCarModal } = useModal();
  const { setIsRouteEnabled, setStartPoint, setEndPoint } = useMap();
  const { activeList } = useList();
  const navigate = useNavigate();
  const { is_passenger_create } = bookedDrive;
  const tripData = useTripById(bookedDrive.id);
  const driverData = useDriverById(tripData.driver_id).data;
  const passengerData = useUserByUserId(tripData?.passengers?.[0]?.user_id)?.data;
  let targetUser;
  if (is_passenger_create) {
    targetUser = passengerData;
  } else {
    targetUser = driverData?.user;
  }

  const rating = driverData?.rating;
  const carPhoto = driverData?.user?.driver_profile?.car_photo;

  const [text, setText] = useState("");
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const isDriver = currentRole === "driver";
  const isPaid = isDriver
    ? checkTripState(tripData.passengers, tripData.passenger_payments)
    : checkPaymenst(tripData.passenger_payments, currentUser);
  function bookingByPassenger(e) {
    e.preventDefault();
    const formData = {
      trip_id: tripData.id,
      user_id: currentUser.id,
      text: text,
      seats_requested: 1,
    };
    tripRequestByPassenger(formData);
    toggleBookedModal(false);
  }
  function bookingByDriver(e) {
    e.preventDefault();
    bookedTripByDriver(currentUser.driver_profile.id, bookedDrive.id);
    toggleBookedModal(false);
  }

  function openFeedback(event) {
    event.stopPropagation();
    window.scrollTo(0, 0);
    document.body.classList.add("overflow-y-hidden");
    setFeedbackTarget(is_passenger_create ? targetUser?.id : driverData?.user?.driver_id);
    toggleFeedback(true);
  }

  useEffect(() => {
    if (!bookedDrive || !bookedDrive.start_address || !bookedDrive.end_address) return;

    const start = bookedDrive.start_address.coordinates;
    const end = bookedDrive.end_address.coordinates;

    setStartPoint([start.latitude, start.longitude]);
    setEndPoint([end.latitude, end.longitude]);
    setIsRouteEnabled(true);
  }, [bookedDrive, setEndPoint, setIsRouteEnabled, setStartPoint]);

  useEffect(() => {
    return () => {
      setIsRouteEnabled(false);
      setStartPoint(null);
      setEndPoint(null);
    };
  }, [setEndPoint, setIsRouteEnabled, setStartPoint]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await payment(tripData.price * 100, currentUser.passenger_profile.id, tripData.driver_id, tripData.id);
      const url = data.url || data;
      window.location.assign(url);
    } catch (e) {
      console.error("Не удалось получить ссылку для оплаты", e);
    }
  };

  function finishDrive() {
    updateTripState(bookedDrive.id, "finished");
    toggleBookedModal(false);
    activeList.filter((i) => i !== bookedDrive.id);
  }

  function renderButton() {
    if (isDriver && tripData.state === "started") {
      return (
        <Button
          onClick={finishDrive}
          size={"large"}>
          Закончить
        </Button>
      );
    } else if (tripData.state !== "started") {
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
          <>
            <Button
              onClick={isDriver ? bookingByDriver : bookingByPassenger}
              size={"large"}>
              Забронировать
            </Button>
          </>
        );
      }
    } else if (currentRole === "passenger" && bookedDrive.state === "started" && !isPaid) {
      return (
        <Button
          type='submit'
          className='payform-tbank-btn'
          size='large'
          onClick={handleSubmit}>
          Оплатить
        </Button>
      );
    } else if (isPaid) {
      return (
        <Button
          type='submit'
          className='payform-tbank-btn'
          size='large'
          onClick={() => toggleBookedModal(false)}>
          На главную
        </Button>
      );
    }
  }

  function openCarModal() {
    setCarPhoto(carPhoto);
    toggleCarModal(true);
  }

  function openChat() {
    if (isDriver) {
      navigate(`/chat/${bookedDrive.id}/${targetUser?.id}`);
    } else {
      navigate(`/chat/${bookedDrive.id}/${currentUser.id}`);
    }
  }

  return (
    <Footer className={"bg-[#fff] w-full z-10 flex flex-col items-center "}>
      <div className=''>
        {isTextAreaVisible ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Введите комментарий (необязательно)'
            className='w-full min-h-[237px] bg-[#F6F6F6] rounded-[15px] border border-[#B4B4B4] mb-10 p-4 text-[14px] leading-4 text-[#919191] focus:border-none focus:outline-none focus:ring-0'
          />
        ) : (
          <>
            <div className='w-full flex justify-between py-5 border-b border-[#EFEFF4] no-scrollbar'>
              <div className='flex text-left'>
                <img
                  className='w-[50px] h-[50px] rounded-full mr-4'
                  src={targetUser?.profile_photo}
                />
                <div className='text-[#343B71] font-medium text-[17px] leading-5'>
                  <h3 className='pb-3'>{targetUser?.name}</h3>
                  {!is_passenger_create && (
                    <div>
                      <p className='profile-stars'>{rating}</p>
                    </div>
                  )}
                </div>
              </div>
              {currentRole === "passenger" && (
                <div className='flex gap-4'>
                  <button
                    className='w-10 h-10 bg-[#007BFF] rounded-full flex justify-center items-center'
                    onClick={openChat}>
                    <svg
                      width='28'
                      height='28'
                      viewBox='0 0 28 28'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M18.3775 23.5575C17.0367 24.1067 15.556 24.4137 13.9998 24.4137C7.81288 24.4137 2.7998 19.5783 2.7998 13.6067C2.7998 7.64057 7.81288 2.7998 13.9998 2.7998C20.1867 2.7998 25.1998 7.64057 25.189 13.6175C25.189 15.766 24.5375 17.769 23.4121 19.4544C23.3637 19.5137 23.3206 19.5837 23.2775 19.6537C23.1483 19.8852 23.0675 20.1544 23.0675 20.4398L24.2575 25.1998L19.7344 23.536C19.5352 23.4498 19.3144 23.4067 19.0829 23.4067C18.8729 23.4067 18.6683 23.4444 18.4798 23.5144C18.4798 23.5198 18.4744 23.5198 18.469 23.5198C18.4367 23.5306 18.4098 23.5413 18.3775 23.5575ZM20.8921 13.9998C20.8921 13.0467 20.1221 12.2767 19.169 12.2767C18.216 12.2767 17.446 13.0467 17.446 13.9998C17.446 14.9529 18.216 15.7229 19.169 15.7229C20.1221 15.7229 20.8921 14.9529 20.8921 13.9998ZM13.9998 12.2767C14.9529 12.2767 15.7229 13.0467 15.7229 13.9998C15.7229 14.9529 14.9529 15.7229 13.9998 15.7229C13.0467 15.7229 12.2767 14.9529 12.2767 13.9998C12.2767 13.0467 13.0467 12.2767 13.9998 12.2767ZM10.5537 13.9998C10.5537 13.0467 9.78365 12.2767 8.83057 12.2767C7.8775 12.2767 7.1075 13.0467 7.1075 13.9998C7.1075 14.9529 7.8775 15.7229 8.83057 15.7229C9.78365 15.7229 10.5537 14.9529 10.5537 13.9998Z'
                        fill='black'
                      />
                      <mask
                        id='mask0_355_3505'
                        maskUnits='userSpaceOnUse'
                        x='2'
                        y='2'
                        width='24'
                        height='24'>
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M18.3775 23.5575C17.0367 24.1067 15.556 24.4137 13.9998 24.4137C7.81288 24.4137 2.7998 19.5783 2.7998 13.6067C2.7998 7.64057 7.81288 2.7998 13.9998 2.7998C20.1867 2.7998 25.1998 7.64057 25.189 13.6175C25.189 15.766 24.5375 17.769 23.4121 19.4544C23.3637 19.5137 23.3206 19.5837 23.2775 19.6537C23.1483 19.8852 23.0675 20.1544 23.0675 20.4398L24.2575 25.1998L19.7344 23.536C19.5352 23.4498 19.3144 23.4067 19.0829 23.4067C18.8729 23.4067 18.6683 23.4444 18.4798 23.5144C18.4798 23.5198 18.4744 23.5198 18.469 23.5198C18.4367 23.5306 18.4098 23.5413 18.3775 23.5575ZM20.8921 13.9998C20.8921 13.0467 20.1221 12.2767 19.169 12.2767C18.216 12.2767 17.446 13.0467 17.446 13.9998C17.446 14.9529 18.216 15.7229 19.169 15.7229C20.1221 15.7229 20.8921 14.9529 20.8921 13.9998ZM13.9998 12.2767C14.9529 12.2767 15.7229 13.0467 15.7229 13.9998C15.7229 14.9529 14.9529 15.7229 13.9998 15.7229C13.0467 15.7229 12.2767 14.9529 12.2767 13.9998C12.2767 13.0467 13.0467 12.2767 13.9998 12.2767ZM10.5537 13.9998C10.5537 13.0467 9.78365 12.2767 8.83057 12.2767C7.8775 12.2767 7.1075 13.0467 7.1075 13.9998C7.1075 14.9529 7.8775 15.7229 8.83057 15.7229C9.78365 15.7229 10.5537 14.9529 10.5537 13.9998Z'
                          fill='white'
                        />
                      </mask>
                      <g mask='url(#mask0_355_3505)'>
                        <rect
                          width='28'
                          height='28'
                          fill='white'
                        />
                      </g>
                    </svg>
                  </button>
                  {/* <button
                    className='w-10 h-10 bg-[#4CE5B1] rounded-full flex justify-center items-center'
                    onClick={() => (window.location.href = `tel:${targetUser?.phone_number}`)}>
                    <svg
                      width='28'
                      height='30'
                      viewBox='0 0 28 30'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M11.9215 8.62921C11.6363 5.21906 8.21355 3.54581 8.0687 3.47751C7.9328 3.41077 7.78048 3.39059 7.63414 3.41698C3.68278 4.09839 3.08843 6.48875 3.06454 6.58809C3.03168 6.72778 3.03766 6.87214 3.07947 7.00718C7.79243 22.2062 17.5872 25.0234 20.8068 25.95C21.0547 26.0214 21.2593 26.0789 21.4146 26.1316C21.4893 26.158 21.5669 26.1689 21.6446 26.1689C21.7506 26.1689 21.8566 26.1456 21.9537 26.099C22.0523 26.0525 24.3789 24.9132 24.9478 21.1972C24.9732 21.0358 24.9478 20.8682 24.8762 20.7223C24.8254 20.6198 23.6083 18.2124 20.2334 17.3618C19.9974 17.2982 19.7555 17.3633 19.5733 17.5248C18.5086 18.4701 17.0377 19.4774 16.403 19.5814C12.1485 17.4192 9.77259 13.2702 9.68299 12.4833C9.63072 12.0409 10.6059 10.4872 11.7274 9.2237C11.8692 9.06382 11.9409 8.84652 11.9215 8.62921Z'
                        fill='black'
                      />
                      <mask
                        id='mask0_355_3508'
                        maskUnits='userSpaceOnUse'
                        x='3'
                        y='3'
                        width='22'
                        height='24'>
                        <path
                          d='M11.9215 8.62921C11.6363 5.21906 8.21355 3.54581 8.0687 3.47751C7.9328 3.41077 7.78048 3.39059 7.63414 3.41698C3.68278 4.09839 3.08843 6.48875 3.06454 6.58809C3.03168 6.72778 3.03766 6.87214 3.07947 7.00718C7.79243 22.2062 17.5872 25.0234 20.8068 25.95C21.0547 26.0214 21.2593 26.0789 21.4146 26.1316C21.4893 26.158 21.5669 26.1689 21.6446 26.1689C21.7506 26.1689 21.8566 26.1456 21.9537 26.099C22.0523 26.0525 24.3789 24.9132 24.9478 21.1972C24.9732 21.0358 24.9478 20.8682 24.8762 20.7223C24.8254 20.6198 23.6083 18.2124 20.2334 17.3618C19.9974 17.2982 19.7555 17.3633 19.5733 17.5248C18.5086 18.4701 17.0377 19.4774 16.403 19.5814C12.1485 17.4192 9.77259 13.2702 9.68299 12.4833C9.63072 12.0409 10.6059 10.4872 11.7274 9.2237C11.8692 9.06382 11.9409 8.84652 11.9215 8.62921Z'
                          fill='white'
                        />
                      </mask>
                      <g mask='url(#mask0_355_3508)'>
                        <rect
                          y='0.236328'
                          width='28'
                          height='29.1034'
                          fill='white'
                        />
                      </g>
                    </svg>
                  </button> */}
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
                      <svg
                        className='pb-2'
                        width='32'
                        height='30'
                        viewBox='0 0 22 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M14.135 10.5C14.015 10.5 13.89 10.48 13.77 10.44C13.5446 10.3683 13.3481 10.2261 13.2095 10.0344C13.0709 9.8427 12.9974 9.61156 13 9.375V7.97C11.87 7.79 11 6.805 11 5.625V2.375C11 1.065 12.065 0 13.375 0H19.125C20.435 0 21.5 1.065 21.5 2.375V5.625C21.5 6.935 20.435 8 19.125 8H16.565L15.025 10.05C14.805 10.34 14.48 10.5 14.135 10.5ZM7 11.75C4.93 11.75 3.25 10.07 3.25 8C3.25 5.93 4.93 4.25 7 4.25C9.07 4.25 10.75 5.93 10.75 8C10.75 10.07 9.07 11.75 7 11.75ZM0.5 15.395C0.5 15.44 0.575 20 7 20C13.425 20 13.5 15.44 13.5 15.395V14.875C13.5 13.84 12.66 13 11.625 13H2.375C1.34 13 0.5 13.84 0.5 14.875V15.395Z'
                          fill='#EF7828'
                        />
                      </svg>
                      <span className='text-[#242E42] text-[17px] leading-5 font-bold'>Оставить отзыв</span>
                    </div>
                  )}
                  <div className='flex flex-col justify-center items-center py-4 border rounded-2xl border-black w-[150px] h-[104px]'>
                    {isPaid ? (
                      <>
                        {" "}
                        <img
                          width={25}
                          height={25}
                          src={goodReviewImg}
                          alt=''
                        />
                        <span className='text-[#242E42] text-[17px] leading-5 font-bold'>Поездка оплачена</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className=''
                          width='25'
                          height='25'
                          viewBox='0 0 30 30'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'>
                          <path
                            d='M16.952 15L24.596 7.356C25.1347 6.81733 25.1347 5.94267 24.596 5.404C24.0573 4.86533 23.1827 4.86533 22.644 5.404L15 13.048L7.356 5.404C6.81733 4.86533 5.94267 4.86533 5.404 5.404C4.86533 5.94267 4.86533 6.81733 5.404 7.356L13.048 15L5.404 22.644C4.86533 23.1827 4.86533 24.0573 5.404 24.596C5.94267 25.1347 6.81733 25.1347 7.356 24.596L15 16.952L22.644 24.596C23.1827 25.1347 24.0573 25.1347 24.596 24.596C25.1347 24.0573 25.1347 23.1827 24.596 22.644L16.952 15Z'
                            fill='#2C2C2C'
                          />
                          <mask
                            id='mask0_48_4925'
                            maskUnits='userSpaceOnUse'
                            x='5'
                            y='5'
                            width='20'
                            height='20'>
                            <path
                              d='M16.952 15L24.596 7.356C25.1347 6.81733 25.1347 5.94267 24.596 5.404C24.0573 4.86533 23.1827 4.86533 22.644 5.404L15 13.048L7.356 5.404C6.81733 4.86533 5.94267 4.86533 5.404 5.404C4.86533 5.94267 4.86533 6.81733 5.404 7.356L13.048 15L5.404 22.644C4.86533 23.1827 4.86533 24.0573 5.404 24.596C5.94267 25.1347 6.81733 25.1347 7.356 24.596L15 16.952L22.644 24.596C23.1827 25.1347 24.0573 25.1347 24.596 24.596C25.1347 24.0573 25.1347 23.1827 24.596 22.644L16.952 15Z'
                              fill='white'
                            />
                          </mask>
                          <g mask='url(#mask0_48_4925)'>
                            <rect
                              width='30'
                              height='30'
                              fill='white'
                            />
                          </g>
                        </svg>
                        <span className='text-[#242E42] text-[17px] leading-5 font-bold'>Поездка не оплачена</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            )}
            <div className='w-full flex justify-between py-5 border-b border-[#EFEFF4]'>
              <div className='mr-10 flex flex-col'>
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
                фото машины
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
            </div>{" "}
          </>
        )}

        {renderButton()}
      </div>
    </Footer>
  );
}
