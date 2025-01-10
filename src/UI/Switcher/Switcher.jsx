export default function Switcher({ isActive }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='relative w-[90px]  h-[6px] bg-white rounded-full'>
        <div
          className={`absolute top-0 h-[6px] bg-[#F5AE7E] rounded-full transition-transform duration-300 ${
            isActive ? "translate-x-[45px]" : "translate-x-0"
          }`}
          style={{ width: "50%" }}></div>
      </div>
    </div>
  );
}
