import Background from "../assets/welcome/startScreen.png";
import Button from "./Button/Button";
import Footer from "./Footer/Footer";
import Switcher from "./Switcher/Switcher";

export default function Welcome({ func, step, isUserLoaded }) {
  return (
    <div className='flex justify-center items-center h-screen w-full'>
      <img
        className='pb-[180px]'
        src={Background}
        alt='Приветственная картинка'
      />
      <Footer className={"bg-[#f6f6f6] shadow-custom z-10 pt-12 pb-6 px-5 flex flex-col items-center justify-center"}>
        <h1 className='text-[24px] pb-7 font-bold'>Приложение для совместных поездок</h1>
        <p className='pb-[60px]'>
          Есть возможность создавать маршруты, искать активные поездки, бронировать их и взаимодействовать между собой
          через чат.
        </p>
        <div className='flex gap-5 pb-9 justify-center'>
          <Button
            disabled={!isUserLoaded}
            size='small'
            onClick={() => func("passenger")}>
            Я попутчик
          </Button>
          <Button
            disabled={!isUserLoaded}
            size='small'
            onClick={() => func("driver")}>
            Я водитель
          </Button>
        </div>
        <Switcher position={step} />
      </Footer>
    </div>
  );
}
