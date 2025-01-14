// import { useState } from "react";
import FooterBlock from "../components/FooterBlock";
import Button from "../UI/Button/Button";
import Switcher from "../UI/Switcher/Switcher";
import Background from "../assets/welcome/startScreen.png";
import { useNavigate } from "react-router-dom";
export default function StartPage() {
  // const navigate = useNavigate();
  // const navigateToRegister = () => {
  //   navigate("/register");
  // };
  return (
    <div className='flex justify-center items-center h-screen'>
      <img
        className='pb-[180px]'
        src={Background}
        alt='Приветственная картинка'
      />
      <FooterBlock
        className={"bg-[#f6f6f6] shadow-custom w-full z-10 pt-12 pb-6 px-5 flex flex-col items-center justify-center"}>
        <h1 className='text-[24px] pb-7 font-bold'>Приложение для совместных поездок</h1>
        <p className='pb-[60px]'>Приложение находится в разработке и запустится в скором времени!</p>
      </FooterBlock>
    </div>
  );
}
