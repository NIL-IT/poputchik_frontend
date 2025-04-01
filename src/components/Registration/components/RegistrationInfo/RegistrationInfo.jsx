import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";
import Select from "../../../Select/Select";
import Input from "../../../Input/Input";

export default function RegistrationInfo({
  setName,
  handleFileChange,
  avatar,
  visibleAvatarPhoto,
  formError,
  name,
  phone,
  handlePhoneChange,
  email,
  setEmail,
  about,
  setAbout,
  city,
  handleCityChange,
  privacyAccepted,
  setPrivacyAccepted,
  infoAccepted,
  setInfoAccepted,
}) {
  return (
    <>
      <fieldset className='w-[121px] h-[121px] mb-10 relative'>
        <input
          id='upload-file'
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='visually-hidden'
        />
        <label
          htmlFor='upload-file'
          className='img-upload__label img-upload__control'
          style={{
            backgroundImage: avatar && `url(${visibleAvatarPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
          Загрузить
        </label>
        {formError.avatar && (
          <p className='text-red-500 text-sm absolute -bottom-6 text-center w-full'>{formError.avatar}</p>
        )}
      </fieldset>

      <div className='w-full relative'>
        <Input
          type='text'
          placeholder='Имя'
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength='17'
        />
        {formError.name && <p className='text-red-500 text-sm mt-1'>{formError.name}</p>}
      </div>

      <div className='w-full relative'>
        <PhoneInput
          className={`input tel ${phone?.length <= 2 ? "grey" : ""}`}
          placeholder='Номер телефона'
          value={phone}
          onChange={handlePhoneChange}
          international
          defaultCountry='RU'
          maxLength='16'
        />
        {formError.phone && <p className='text-red-500 text-sm mt-1'>{formError.phone}</p>}
      </div>

      <div className='w-full relative'>
        <Input
          type='email'
          placeholder='Почта'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {formError.email && <p className='text-red-500 text-sm mt-1'>{formError.email}</p>}
      </div>

      <div className='w-full relative'>
        <Input
          type='text'
          placeholder='О себе'
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </div>

      <div className='w-full relative'>
        <Select
          selectedValue={city}
          options={["село Майма", "Горно-Алтайск", "село Манжерок", "село Ая"]}
          placeholder='Город'
          onChange={handleCityChange}
        />
        {formError.city && <p className='text-red-500 text-sm mt-1'>{formError.city}</p>}
      </div>

      <div className='w-full flex items-start gap-2 mt-2 flex-col'>
        <div className='flex gap-2'>
          <input
            type='checkbox'
            id='privacy'
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            className='mt-1'
            required
          />
          <label
            htmlFor='privacy'
            className='text-sm'>
            Я согласен с{" "}
            <Link
              to='/privacy'
              className='text-blue-600 underline'>
              политикой конфиденциальности
            </Link>
          </label>
        </div>
        {formError.privacy && <p className='text-red-500 text-sm mt-1'>{formError.privacy}</p>}
      </div>
      <div className='w-full flex items-start gap-2 mt-2 flex-col'>
        <div className='flex gap-2'>
          <input
            type='checkbox'
            id='privacy'
            checked={infoAccepted}
            onChange={(e) => setInfoAccepted(e.target.checked)}
            className='mt-1'
            required
          />
          <label
            htmlFor='privacy'
            className='text-sm'>
            ознакомлен с{" "}
            <Link
              to='/info'
              className='text-blue-600 underline'>
              приложением
            </Link>
          </label>
        </div>
        {formError.info && <p className='text-red-500 text-sm mt-1'>{formError.info}</p>}
      </div>
    </>
  );
}
