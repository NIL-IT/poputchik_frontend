import "./Profile.css";
import message from "../../assets/icons/message.svg";
import { useModal } from "../../state/ModalStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../state/UserStore";
import { formatDate } from "../../utils/utils";
import { useMap } from "../../state/MapRoutesStore";
import { useTrip } from "../../state/TripStore";
import { useDriverById } from "../../api/driver";
export default function Profile({ driver }) {
  const { setSelectedDriver } = useModal();
  const navigate = useNavigate();

  if (!driver) {
    return null;
  }
  const { currentRole, currentUser } = useUserStore();
  const { setIsRouteEnabled, isRouteEnabled } = useMap();
  const { setBookedDrive, setFeedbackTarget } = useTrip();
  const { toggleBookedModal } = useModal();

  const driverData = useDriverById(driver?.driver_id)?.data;

  const { start_address, end_address, departure_time } = driver;
  const date = formatDate(departure_time);
  const user = currentRole === "driver" ? driver?.user : driverData?.user || {};
  const rating = currentRole === "driver" ? driver?.rating : driverData?.rating ?? "";
  if (!user || Object.keys(user).length === 0) return null;
  function chooseDrive(event) {
    event.stopPropagation();
    if (driver.state == "active" && currentRole == "passenger" && currentUser.passenger_profile) {
      setBookedDrive(driver);
      toggleBookedModal(true);
      setIsRouteEnabled(true);
    }
  }
  const openProfile = () => {
    setSelectedDriver(driver);
    navigate(`/userReview/${user.id}`);
  };
  console.log(driverData?.rating);
  if (!user) return null;
  console.log(driver);
  return (
    <div
      className='profile'
      onClick={(e) => chooseDrive(e)}>
      <div className='profile-info'>
        <img
          className='profile-img'
          src={user.profile_photo}
          onClick={() => openProfile()}
        />
        <div className='profile-text'>
          <div className='flex gap-5'>
            <h3 className='profile-name'>{user.name}</h3>
            <p className='profile-stars'>{rating}</p>
          </div>
          {/* {currentRole == "passenger" && driver.driver_profile && <div className='profile-ratings'></div>} */}
          <span className='profile-path'>{`${start_address.name} - ${end_address.name}`}</span>
          <div className='profile-date'>{date}</div>
        </div>
      </div>
      <button className='profile-message'>
        <img
          src={message}
          alt=''
        />
      </button>
    </div>
  );
}
