import "./Profile.css";
import message from "../../assets/icons/message.svg";
import { useModal } from "../../state/ModalStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../state/UserStore";
import { formatDate } from "../../utils/utils";
import { useMap } from "../../state/MapRoutesStore";
import { useTrip } from "../../state/TripStore";
import { useDriverById } from "../../api/driver";
import { cleanAddress } from "../../api/api";
import { approveRequest, rejectRequest } from "../../api/trips";
import { useState } from "react";

export default function Profile({ drive, passenger, onList, pending, request }) {
  const { setSelectedDriver, toggleBookedModal } = useModal();
  const navigate = useNavigate();
  const [reqStatus, setReqStatus] = useState(request ? request.status : null);
  const { currentRole, currentUser } = useUserStore();
  const { setIsRouteEnabled } = useMap();
  const { setBookedDrive } = useTrip();
  const driverData = useDriverById(drive?.driver_id)?.data;

  if (!drive) {
    console.error("Drive is not provided", drive);
    return null;
  }

  const { start_address, end_address, departure_time, id } = drive;

  if (!start_address || !end_address) {
    console.error("Не заданы адреса отправления или прибытия для", drive);
    return null;
  }

  if (request && reqStatus !== "pending") {
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
      if (onList === true) navigate("/main");
    }
  }

  function openChat(e) {
    e.stopPropagation();
    if (currentRole === "driver") {
      navigate(`/chat/${id}/${user.id}`);
    } else {
      navigate(`/chat/${id}/${currentUser.id}`);
    }
  }

  const openProfile = (e) => {
    e.stopPropagation();
    if (currentRole === "passenger") {
      setSelectedDriver(drive);
      navigate(`/userReview/${user.id}`);
    }
  };

  const handleReject = (e) => {
    e.stopPropagation();
    rejectRequest(request.id);
    setReqStatus("reject");
  };

  const handleApprove = (e) => {
    e.stopPropagation();
    approveRequest(request.id);
    setReqStatus("approve");
  };

  return (
    <div
      className='profile'
      onClick={(e) => chooseDrive(e)}>
      <div className='profile-wrapper'>
        <div className='profile-info'>
          <img
            className='profile-img'
            src={user.profile_photo}
            alt='Profile'
            onClick={(e) => openProfile(e)}
          />
          <div className='profile-text'>
            <div className='flex gap-5'>
              <h3 className='profile-name'>{user.name}</h3>
              {currentRole === "passenger" && <p className='profile-stars'>{rating}</p>}
            </div>
            <span className='profile-path'>
              {`${cleanAddress(start_address?.name) || "Не указан"} - ${
                cleanAddress(end_address?.name) || "Не указан"
              }`}
            </span>
            <div className='profile-date'>{date}</div>
          </div>
          <button
            onClick={(e) => openChat(e)}
            className='profile-message'>
            <img
              src={message}
              alt='Message icon'
            />
          </button>
        </div>
      </div>
      {pending && (
        <div className='profile-pending mt-2'>
          <div className='pending-message text-left'>{request.text}</div>
          <div className='pending-btns'>
            <button
              className='pending-reject pending-btn'
              onClick={handleReject}>
              Отклонить
            </button>
            <button
              className='pending-approve pending-btn'
              onClick={handleApprove}>
              Принять
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
