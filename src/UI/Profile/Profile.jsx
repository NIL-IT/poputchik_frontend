import "./Profile.css";
import message from "../../assets/icons/message.svg";
import { useModal } from "../../state/ModalStore";
import { useNavigate } from "react-router-dom";
import { getReviewsByDriverId } from "../../api/api";
import { useUserStore } from "../../state/UserStore";
export default function Profile({ driver }) {
  const { setSelectedDriver } = useModal();
  const navigate = useNavigate();
  const openProfile = () => {
    setSelectedDriver(driver);
    navigate("/userReview");
  };
  if (!driver) {
    return null;
  }
  const { currentRole } = useUserStore();
  const { name, id, profile_photo } = driver.user;
  console.log(driver.user);
  const comments =
    currentRole == "passenger" && driver.driver_profile ? getReviewsByDriverId(driver.driver_profile.id) : "";
  console.log(id);
  return (
    <div className='profile'>
      <div
        className='profile-info'
        onClick={() => openProfile()}>
        <img
          className='profile-img'
          src={profile_photo}
        />
        <div className='profile-text'>
          <h3 className='profile-name'>{name}</h3>
          {currentRole == "passenger" && driver.driver_profile && (
            <div className='profile-ratings'>
              <p className='profile-stars'>{id}</p>
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
