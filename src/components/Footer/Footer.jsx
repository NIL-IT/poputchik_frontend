export default function Footer({ children, className }) {
  return (
    <div className={`${className} absolute bottom-0 w-screen  rounded-tl-[15px] rounded-tr-[15px] min-h-[320px] py-5 `}>
      <div className='w-[360px] max-h-[400px] overflow-y-auto overflow-x-hidden'>{children}</div>
    </div>
  );
}
