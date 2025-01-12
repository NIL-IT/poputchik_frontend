import { NavLink, useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Input from "../UI/Input/Input";
import Switcher from "../UI/Switcher/Switcher";
import backIcon from "../assets/icons/arrow-left.svg";
import { useState } from "react";
import Select from "../UI/Select/Select";

export default function RegistrationPage({ currentUser, setCurrentUser, role }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [visiblePhoto, setVisiblePhoto] = useState("");
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const regex = /^\w+$/;
  // console.log(role);

  async function sendData(data) {
    const response = await fetch(`http://localhost:8082/users/signup_passenger`, {
      method: "POST",
      body: data,
      encType: "multipart/form-data",
      mode: "no-cors",
    });
    console.log(role);
    if (!response.status === 201) {
      throw new Error(response.body);
    }
  }

  const handleCityChange = (value) => {
    setCity(value);
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
    setVisiblePhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    if (!name || !regex.test(name)) {
      setFormError("Имя обязательно и должно быть корректным");
      isValid = false;
    } else if (!isValidPhoneNumber(phone)) {
      setFormError("Неверный номер телефона");
      isValid = false;
    } else if (!email) {
      setFormError("Почта обязательна");
      isValid = false;
    } else {
      setFormError("");
    }

    if (isValid) {
      const formData = new FormData();
      formData.append("telegram_id", "431");
      formData.append("profile_photo", avatar);
      formData.append("name", name);
      formData.append("phone_number", phone);
      formData.append("email", email);
      formData.append("city", city);

      try {
        await sendData(formData, role).then(() => navigate("/main"));
        setCurrentUser({ avatar, name, phone, email, city });
      } catch (error) {
        setFormError(error.message || "Неизвестная ошибка");
      }
    }
  };

  {
    formError && (
      <span
        className='mb-5'
        style={{ color: "red" }}>
        {typeof formError === "string" ? formError : "Произошла ошибка"}
      </span>
    );
  }

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
        encType='multipart/form-data'
        onSubmit={handleSubmit}
        className='flex flex-col gap-5 justify-center items-center mb-[114px]'
        action='#'>
        <fieldset
          style={{
            backgroundImage: avatar ? `url(${visiblePhoto})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className={`${avatar ? `` : "bg-[#B9B9B9]"}  w-[121px] h-[121px] rounded-full mb-10`}>
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
        <Input
          type={"email"}
          placeholder={"Почта"}
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Select
          selectedValue={city}
          options={["Новосибирск", "Томск"]}
          placeholder='Город'
          value={city}
          onChange={handleCityChange}
        />

        <footer className='absolute bottom-[30px] flex flex-col '>
          <Button
            type='submit'
            classNames='mb-5'
            size={"large"}
            onClick={() => {}}>
            Сохранить
          </Button>
          {formError && (
            <span
              className='mb-5'
              style={{ color: "red" }}>
              {formError}
            </span>
          )}
          <Switcher isActive={true} />
        </footer>
      </form>
    </main>
  );
}
