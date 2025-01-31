import "./Profile.css";
import message from "../../assets/icons/message.svg";
import { useModal } from "../../state/ModalStore";
import { useNavigate } from "react-router-dom";
import { getReviewsByDriverId } from "../../api/api";
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
  const { name, rating, profile_photo } = driver;
  const comments = getReviewsByDriverId(driver.driver_profile.id);
  console.log(driver);
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
          <div className='profile-ratings'>
            <p className='profile-stars'>{rating}</p>
            <p className='profile-comments'>{comments.length}</p>
          </div>
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
