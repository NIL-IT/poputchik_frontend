import "./Profile.css";
import message from "../../assets/icons/message.svg";
import { useModal } from "../../state/ModalStore";
import { useNavigate } from "react-router-dom";
import { getReviewsByDriverId, useDriverById } from "../../api/api";
import { useUserStore } from "../../state/UserStore";
export default function Profile({ driver }) {
  const { setSelectedDriver } = useModal();
  const navigate = useNavigate();

  if (!driver) {
    return null;
  }
  const { currentRole } = useUserStore();

  const driverData = useDriverById(driver?.driver_id)?.data;

  const user = currentRole === "driver" ? driver?.user : driverData?.user || {};
  if (!user || Object.keys(user).length === 0) return null;

  const openProfile = () => {
    setSelectedDriver(driver);
    navigate(`/userReview/${user.id}`);
  };

  const comments =
    currentRole == "passenger" && driver?.driver_profile ? getReviewsByDriverId(driver.driver_profile.id) : "";
  if (!user) return null;

  return (
    <div className='profile'>
      <div className='profile-info'>
        <img
          className='profile-img'
          src={user.profile_photo}
          onClick={() => openProfile()}
        />
        <div className='profile-text'>
          <h3 className='profile-name'>{user.name}</h3>
          {currentRole == "passenger" && driver.driver_profile && (
            <div className='profile-ratings'>
              {/* <p className='profile-stars'>{}</p> */}
              <p className='profile-comments'>{comments.length}</p>
            </div>
          )}
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
