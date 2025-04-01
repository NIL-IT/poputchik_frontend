import Background from "../assets/welcome/startScreen.png";
import Footer from "../components/Footer/Footer";

export default function PreviewPage() {
  return (
    <div className='flex justify-center items-center h-screen container-custom'>
      <img
        className='pb-[180px]'
        src={Background}
        alt='Приветственная картинка'
      />
      <Footer
        className={"bg-[#f6f6f6] shadow-custom w-full z-10 pt-12 pb-6 px-5 flex flex-col items-center justify-center"}>
        <h1 className='text-[24px] pb-7 font-bold'>Приложение для совместных поездок</h1>
        <p className='pb-[60px]'>Приложение находится в разработке и запустится в скором времени!</p>
      </Footer>
    </div>
  );
}
