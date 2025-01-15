export default function Footer({ children, className }) {
  return (
    <div className={`${className} absolute bottom-0 w-full py-5 rounded-tl-[15px] rounded-tr-[15px]`}>
      <div className='container-custom'>{children}</div>
    </div>
  );
}
