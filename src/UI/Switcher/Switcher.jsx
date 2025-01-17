export default function Switcher({ position }) {
  const translateValues = [0, 30, 60];
  const clampedPosition = Math.max(0, Math.min(position, 2));
  const translateX = translateValues[clampedPosition];

  return (
    <div className='absolute z-20 bottom-5 flex flex-col items-center'>
      <div className='relative w-[90px] h-[6px] bg-white rounded-full'>
        <div
          className={`absolute top-0 h-[6px] bg-[#F5AE7E] rounded-full transition-transform duration-300`}
          style={{ width: "50%", transform: `translateX(${translateX}px)` }}></div>
      </div>
    </div>
  );
}
