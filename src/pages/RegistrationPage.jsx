import { NavLink } from "react-router-dom";
import Button from "../UI/Button/Button";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Input from "../UI/Input/Input";
import Switcher from "../UI/Switcher/Switcher";
import backIcon from "../assets/icons/arrow-left.svg";
import { useState } from "react";
export default function RegistrationPage() {
  const [phone, setPhone] = useState("");
  return (
    <main className='px-5 flex flex-col '>
      <header className='pt-[30px] flex items-center mb-12'>
        <NavLink
          to='/'
          className='absolute flex items-center'
          onClick={() => {}}>
          <img
            className='block'
            src={backIcon}
            alt=''
          />
          <p className='pl-4'>Назад</p>
        </NavLink>
        <h1 className='w-full text-center text-2xl leading-6'>Профиль</h1>
      </header>
      <form
        className='flex flex-col gap-5 justify-center items-center mb-[114px]'
        action='#'>
        <div className='bg-[#B9B9B9]  w-[121px] h-[121px] rounded-full mb-10'>{/* <input type='text' /> */}</div>
        <Input
          type={"text"}
          placeholder={"Имя"}
        />
        <PhoneInput
          className='input tel'
          placeholder='Enter phone number'
          value={phone}
          onChange={() => {}}
          international={false}
        />
        <Input
          type={"email"}
          placeholder={"Почта"}
        />
        <Input
          type={"text"}
          placeholder={"Город"}
        />
      </form>
      <footer className='absolute bottom-[30px]'>
        <Button
          classNames='mb-10'
          size={"large"}>
          Сохранить
        </Button>
        <Switcher isActive={true} />
      </footer>
    </main>
  );
}
