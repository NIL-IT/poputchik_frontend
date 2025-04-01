import "./Profile.css";
import message from "../../../../assets/icons/message.svg";
import { cleanAddress } from "../../../../api/api";

export default function Profile({
  user,
  date,
  rating,
  start_address,
  end_address,
  seats_available,
  currentRole,
  pending,
  request,
  handlers,
}) {
  return (
    <div
      className='profile'
      onClick={handlers.chooseDrive}>
      <div className='profile-wrapper'>
        <div className='profile-info'>
          <img
            className='profile-img'
            src={user.profile_photo}
            alt='Profile'
            onClick={handlers.openProfile}
          />
          <div className='profile-text'>
            <div className='flex gap-5'>
              <h3 className='profile-name'>{user.name}</h3>
              {currentRole === "passenger" && rating > 0 && <p className='profile-stars'>{rating}</p>}
            </div>
            <span className='profile-path'>
              {`${cleanAddress(start_address?.name) || "Не указан"} - ${
                cleanAddress(end_address?.name) || "Не указан"
              }`}
            </span>
          </div>
          <button
            onClick={handlers.openChat}
            className='profile-message'>
            <img
              src={message}
              alt='Message icon'
            />
          </button>
        </div>
        <div className='flex justify-between items-center mt-2'>
          <div className='profile-date'>{date}</div>
          {currentRole === "passenger" && <div className='profile-seats'>Свободные места {seats_available}</div>}
        </div>
      </div>

      {pending && (
        <div className='profile-pending mt-2'>
          <div className='pending-message text-left'>{request.text}</div>
          <div className='pending-btns'>
            <button
              className='pending-reject pending-btn'
              onClick={handlers.handleReject}>
              Отклонить
            </button>
            <button
              className='pending-approve pending-btn'
              onClick={handlers.handleApprove}>
              Принять
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
