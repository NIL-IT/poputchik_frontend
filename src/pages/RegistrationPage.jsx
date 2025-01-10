import { NavLink } from "react-router-dom";
import Button from "../UI/Button/Button";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Input from "../UI/Input/Input";
import Switcher from "../UI/Switcher/Switcher";
import backIcon from "../assets/icons/arrow-left.svg";
import { useState } from "react";
import Select from "../UI/Select/Select";
export default function RegistrationPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [formError, setFormError] = useState("");

  const regex = /^\w+$/;

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleFileChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (!name && regex.test(name)) {
      // setFormError("Имя обязательно");
      isValid = false;
    } else {
      setFormError("");
    }

    if (!isValidPhoneNumber(phone)) {
      setFormError("Неверный номер телефона");
      isValid = false;
    } else {
      setFormError("");
    }

    if (!email) {
      setFormError("Почта обязательна");
      isValid = false;
    } else {
      setFormError("");
    }

    if (isValid) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("city", city);
      if (avatar) {
        formData.append("avatar", avatar);
      }
    }
  };
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
        onSubmit={handleSubmit}
        className='flex flex-col gap-5 justify-center items-center mb-[114px]'
        action='#'>
        <fieldset
          style={{
            backgroundImage: avatar ? `url(${avatar})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`${avatar ? `bg-[url("${avatar}")]` : "bg-[#B9B9B9]"}  w-[121px] h-[121px] rounded-full mb-10`}>
          <input
            id='upload-file'
            className='visually-hidden'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
          />
          <label
            htmlFor='upload-file'
            className='img-upload__label  img-upload__control'>
            Загрузить
          </label>
        </fieldset>
        <Input
          type={"text"}
          placeholder={"Имя"}
          maxLength='17'
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        {formError && <span style={{ color: "red" }}>{formError}</span>}
        <PhoneInput
          className={`input tel ${phone?.length <= 2 ? "grey" : ""}`}
          placeholder='Номер телефона'
          value={phone}
          onChange={handlePhoneChange}
          international={true}
          limitMaxLength={true}
          defaultCountry='RU'
          maxLength='16'
          rules={{ required: true }}
        />
        {formError && <span style={{ color: "red" }}>{formError}</span>}
        <Input
          type={"email"}
          placeholder={"Почта"}
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        {formError && <span style={{ color: "red" }}>{formError}</span>}
        <Select
          options={[
            { value: "nsk", label: "Новосибирск" },
            { value: "biys", label: "Бийск" },
          ]}
          placeholder='Город'
          value={city}
          onChange={(value) => setCity(value)}
        />
        {formError && <span style={{ color: "red" }}>{formError}</span>}

        <footer className='absolute bottom-[30px]'>
          <Button
            type='submit'
            classNames='mb-10'
            size={"large"}
            onClick={() => {}}>
            Сохранить
          </Button>
          <Switcher isActive={true} />
        </footer>
      </form>
    </main>
  );
}
