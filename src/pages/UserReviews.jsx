import { useNavigate, useParams } from "react-router-dom";
import { useModal } from "../state/ModalStore";
import { useDriverById, useDriverReviews } from "../api/driver";
import { useDriversTripsList, usePassengerTripsList } from "../api/trips";
import { useUserById } from "../api/user";
import CloseBtn from "../components/NavigationButton/components/CloseBtn/CloseBtn";
import ReviewCard from "../components/ReviewCard/ReviewCard";

export default function UserReviews() {
  const navigate = useNavigate();
  const { selectedDriver } = useModal();
  const { userId } = useParams();
  const userData = useUserById(selectedDriver.telegram_id);

  const driverTrips = useDriversTripsList(userId, "finished");
  const passengerTrips = usePassengerTripsList(userId, "finished");
  const driverReviews = useDriverReviews(userData?.data?.driver_profile?.id || null);
  const driverData = useDriverById(userData?.data?.driver_profile?.id || null);

  const tripsList = userData?.data?.driver_profile ? driverTrips : passengerTrips;
  const reviews = userData?.data?.driver_profile ? driverReviews : [];
  const rating = driverData?.data?.rating || 0;
  const user = selectedDriver;

  if (!user) return <div>Loading...</div>;

  return (
    <div className='relative pt-10'>
      <CloseBtn onClick={() => navigate(-1)} />
      <div className='flex flex-col items-start justify-start w-full pt-10'>
        <div className='flex gap-2 mb-10 text-left mx-5'>
          <img
            className='rounded-full w-[76px] h-[76px]'
            src={selectedDriver.profile_photo}
            alt='Фото профиля'
          />
          <div>
            <h4 className='font-bold text-[24px] leading-6 text-black pb-2'>{selectedDriver.name}</h4>
            <p className='text-[#9D9D9D] text-[16px]'>Рейтинг {rating}/5</p>
            <div className='flex gap-2 mt-4'>
              {[0, 1, 2, 3, 4].map((star, i) => (
                <svg
                  key={i}
                  width='27'
                  height='24'
                  viewBox='0 0 27 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M13.4999 20.0993L19.5859 23.7824C20.7004 24.4574 22.0643 23.4595 21.771 22.1976L20.1578 15.2716L25.5398 10.6054C26.5224 9.75433 25.9945 8.14023 24.7039 8.03751L17.6208 7.43589L14.8491 0.891426C14.3505 -0.297142 12.6493 -0.297142 12.1507 0.891426L9.37906 7.42122L2.29589 8.02284C1.00537 8.12555 0.477431 9.73966 1.45998 10.5907L6.84202 15.257L5.22888 22.1829C4.93558 23.4449 6.29942 24.4427 7.41396 23.7677L13.4999 20.0993Z'
                    fill={Math.floor(rating) <= i ? "#E8E8E8" : "#FBC02D"}
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center w-full mb-4'>
          <div className='review'>{selectedDriver.info}</div>
        </div>
        <div className='flex flex-col w-full justify-center items-center'>
          <div className='flex justify-between items-center w-[350px] border-t border-b border-[#CECECE]'>
            <div className='flex flex-col text-[16px] py-6'>
              <span className='font-bold pb-2'>{tripsList?.length || 0}</span>
              <span>поездок</span>
            </div>
            <div className='flex flex-col'>
              <span className='font-bold pb-2'>{reviews?.length || 0}</span>
              <span>Отзывов</span>
            </div>
            <div className='flex flex-col'>
              <span className='font-bold pb-2'>{selectedDriver.registerDate || "2025"}</span>
              <span>Зарегистрирован</span>
            </div>
          </div>
          <div className='mt-8 flex gap-5 flex-col w-full items-center'>
            {reviews?.length > 0 ? (
              reviews.map((review, i) => (
                <ReviewCard
                  key={i}
                  review={review}
                />
              ))
            ) : (
              <>{"У этого пользователя нет отзывов"}</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
