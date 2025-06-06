import { useNavigate } from "react-router-dom";

export default function BackButton({ ...props }) {
  const navigate = useNavigate();
  return (
    <button
      className='absolute top-[55px]  left-5 w-11 h-11 rounded-full flex justify-center items-center bg-[#fff] shadow-btnback z-10'
      onClick={() => navigate(-1)}
      {...props}>
      <svg
        width='12'
        height='22'
        viewBox='0 0 12 22'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M3.62132 11L11.5607 2.6826C12.1464 2.06892 12.1464 1.07394 11.5607 0.460261C10.9749 -0.15342 10.0251 -0.15342 9.43934 0.460261L0.43934 9.88883C-0.146447 10.5025 -0.146447 11.4975 0.43934 12.1112L9.43934 21.5397C10.0251 22.1534 10.9749 22.1534 11.5607 21.5397C12.1464 20.9261 12.1464 19.9311 11.5607 19.3174L3.62132 11Z'
          fill='#2C2C2C'
        />
      </svg>
    </button>
  );
}
