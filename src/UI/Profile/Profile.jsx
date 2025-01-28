import "./Profile.css";
import message from "../../assets/icons/message.svg";
import { useModal } from "../../state/ModalStore";
import { useNavigate } from "react-router-dom";
export default function Profile({ driver }) {
  const { setSelectedDriver, toggleProfile } = useModal();
  const navigate = useNavigate();
  const openProfile = () => {
    setSelectedDriver(driver);
    navigate("/userReview");
  };
  if (!driver) {
    return null;
  }
  const { name, rating, avatar, comments } = driver;
  return (
    <div className='profile'>
      <div
        className='profile-info'
        onClick={() => openProfile()}>
        <img
          className='profile-img'
          src={avatar}
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
