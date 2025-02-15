import { useNavigate } from "react-router-dom";

export default function Avatar({ img }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/user")}
      className='w-10 h-10 rounded-full overflow-hidden bg-[#2C2C2C] cursor-pointer'>
      <img
        src={img}
        alt='фото пользователя'
        className='w-full h-full object-cover'
      />
    </div>
  );
}
