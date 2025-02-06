import "./Profile.css";
import message from "../../assets/icons/message.svg";
import { useModal } from "../../state/ModalStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../state/UserStore";
import { formatDate } from "../../utils/utils";
import { useMap } from "../../state/MapRoutesStore";
import { useTrip } from "../../state/TripStore";
import { useDriverById } from "../../api/driver";

export default function Profile({ drive, passenger, onList }) {
  const { setSelectedDriver, toggleBookedModal } = useModal();
  const navigate = useNavigate();
  if (!drive) {
    return null;
  }
  const { currentRole, currentUser } = useUserStore();
  const { setIsRouteEnabled } = useMap();
  const { setBookedDrive } = useTrip();

  const driverData = useDriverById(drive?.driver_id)?.data;

  const { start_address, end_address, departure_time, id } = drive;
  console.log(start_address, end_address, departure_time, id);
  if (!start_address || !end_address) {
    console.error("Не заданы адреса отправления или прибытия для", drive);
    return null;
  }

  const date = formatDate(departure_time, true);

  const user = currentRole === "driver" ? passenger : driverData?.user || {};
  const rating = currentRole === "driver" ? "" : driverData?.rating ?? "";

  if (!user || Object.keys(user).length === 0) return null;

  function chooseDrive(event) {
    event.stopPropagation();
    if (drive.state === "active" && currentRole === "passenger" && currentUser.passenger_profile) {
      setBookedDrive(drive);
      toggleBookedModal(true);
      setIsRouteEnabled(true);
      if (onList) navigate("/main");
    }
  }

  const openProfile = () => {
    if (currentRole == "passenger") {
      setSelectedDriver(drive);
      navigate(`/userReview/${user.id}`);
    }
  };

  return (
    <div
      className='profile'
      onClick={(e) => chooseDrive(e)}>
      <div className='profile-info'>
        <img
          className='profile-img'
          src={user.profile_photo}
          alt='Profile'
          onClick={() => openProfile()}
        />
        <div className='profile-text'>
          <div className='flex gap-5'>
            <h3 className='profile-name'>{user.name}</h3>
            {currentRole == "passenger" ? <p className='profile-stars'>{rating}</p> : ""}
          </div>
          <span className='profile-path'>
            {`${start_address?.name || "Не указан"} - ${end_address?.name || "Не указан"}`}
          </span>
          <div className='profile-date'>{date}</div>
        </div>
      </div>
      <button
        onClick={() => navigate(`/chat/${id}/${user.id}`)}
        className='profile-message'>
        <img
          src={message}
          alt='Message icon'
        />
      </button>
    </div>
  );
}
