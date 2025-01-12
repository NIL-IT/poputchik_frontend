import "./Profile.css";
import message from "../../assets/icons/message.svg";
export default function Profile({ driver }) {
  if (!driver) {
    return null;
  }
  const { name, rating, avatar, comments } = driver;
  return (
    <div className='profile'>
      <div className='profile-info'>
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
