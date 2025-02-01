import { useState } from "react";
import { useUserStore } from "../state/UserStore";
import Input from "../UI/Input/Input";
import Select from "../UI/Select/Select";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

export default function UserInfo({ isEditable, value, setCity, setPhone, setMail, setProfilePhoto }) {
  const { currentUser, currentRole } = useUserStore();

  const handleCityChange = (value) => setCity(value);
  const handlePhoneChange = (value) => setPhone(value);

  return (
    <div className='flex flex-col justify-center items-center '>
      <div className='edit flex flex-col justify-center items-center mb-8'>
        <fieldset className={`change-file mb-2`}>
          <input
            id='change-file'
            className='visually-hidden'
            type='file'
            accept='image/*'
            disabled={!isEditable}
          />
          <label
            style={{
              backgroundImage: `url(${currentUser.profile_photo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            htmlFor='change-file'
            className='img-upload__label  img-upload__control'>
            Загрузить
          </label>
        </fieldset>
        <div className='profile-ratings gap-5 '>
          <p className='profile-stars'>4</p>
          <p className='profile-comments'>4.4</p>
        </div>
        <h1 className='font-bold text-[24px] leading-6 pt-6'>{currentUser.name}</h1>
      </div>
      {currentRole === "driver" && (
        <div className='w-full balance-bg py-8 rounded-[10px] mb-10'>
          <h3 className='pb-7  text-[32px] leading-8 text-white'>Баланс, ₽</h3>
          <button className='rounded-[20px] bg-white font-bold text-[16px] text-black px-10 py-4'>
            Вывести средства
          </button>
        </div>
      )}
      <fieldset className='w-full flex flex-col justify-center items-center gap-5 mb-5'>
        <PhoneInput
          className={`input tel ${value.phone?.length <= 2 ? "grey" : ""}`}
          placeholder='Номер телефона'
          value={value.phone}
          onChange={handlePhoneChange}
          international
          defaultCountry='RU'
          maxLength='16'
          disabled={!isEditable}
        />
        <Input
          type={"email"}
          readOnly={!isEditable}
          value={value.mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <Select
          readOnly={!isEditable}
          selectedValue={value.city}
          options={["село Майма", "Горно-Алтайск", "село Манжерок", "село Ая"]}
          placeholder='Город'
          onChange={handleCityChange}
        />
      </fieldset>
    </div>
  );
}
