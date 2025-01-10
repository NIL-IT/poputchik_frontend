import "./Profile.css";
import message from "../../assets/icons/message.svg";
export default function Profile({}) {
  return (
    <div className='profile'>
      <div className='profile-info'>
        <img className='profile-img' />
        <div className='profile-text'>
          <h3 className='profile-name'>Евгений</h3>
          <div className='profile-ratings'>
            <p className='profile-stars'>4</p>
            <p className='profile-comments'>4</p>
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
