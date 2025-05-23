import { useUserStore } from "../../state/UserStore";
import PhoneInput from "react-phone-number-input";
import { useNavigate } from "react-router-dom";
import { useDriverById, useDriverReviews } from "../../api/driver";
import Input from "../Input/Input";
import Select from "../Select/Select";

export default function UserInfo({
  isEditable,
  value,
  setCity,
  setPhone,
  setMail,
  setProfilePhoto,
  setVisiblePhoto,
  setAbout,
}) {
  const { currentUser, currentRole } = useUserStore();
  const navigate = useNavigate();

  const handleCityChange = (value) => setCity(value);
  const handlePhoneChange = (value) => setPhone(value);
  const hasDriverProfile = currentUser.driver_profile?.id;
  const isDriver = currentRole === "driver";

  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
    setVisiblePhoto(URL.createObjectURL(e.target.files[0]));
  };
  const reviews = useDriverReviews(currentUser.driver_profile?.id || null);
  const user = hasDriverProfile ? useDriverById(currentUser.driver_profile.id).data : null;
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
            onChange={handlePhotoChange}
          />
          <label
            style={{
              backgroundImage: `url("${value.visiblePhoto}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            htmlFor='change-file'
            className={`img-upload__label  img-upload__control ${isEditable && 'editing'}`}>
            Загрузить
          </label>
        </fieldset>
        <div className='profile-ratings gap-5 '>
          {hasDriverProfile ? (
            <>
              <p className='profile-stars'>{user ? user.rating : "0"}</p>
              <p className='profile-comments'>{reviews ? reviews.length : 0}</p>
            </>
          ) : (
            <></>
          )}
        </div>
        <h1 className='font-bold text-[24px] leading-6 pt-6'>{currentUser.name}</h1>
      </div>
      {isDriver && (
        <div className='w-full balance-bg py-8 rounded-[10px] mb-10'>
          <h3 className='pb-7  text-[32px] leading-8 text-white'>{currentUser.driver_profile.balance}, ₽</h3>
          <button
            className='rounded-[20px] bg-white font-bold text-[16px] text-black px-10 py-4'
            onClick={() => navigate("/payment")}>
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
        <Input
          type={"text"}
          readOnly={!isEditable}
          value={value.info}
          onChange={(e) => setAbout(e.target.value)}
          placeholder={"О себе"}
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
