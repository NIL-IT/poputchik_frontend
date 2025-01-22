export default function Footer({ children, className }) {
  return (
    <div className={`${className} absolute bottom-0 w-screen py-5 rounded-tl-[15px] rounded-tr-[15px] `}>
      <div className='w-[350px]'>{children}</div>
    </div>
  );
}
