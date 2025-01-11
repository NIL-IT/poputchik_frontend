import { useNavigate } from "react-router-dom";

export default function Avatar({ img }) {
  const navigate = useNavigate();
  return (
    <img
      onClick={() => {
        navigate("/user");
      }}
      className='w-10 h-10 rounded-full bg-[#2C2C2C]'
      src={img}
      alt='фото пользователя'
    />
  );
}
