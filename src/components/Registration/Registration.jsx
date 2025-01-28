import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Input from "../../UI/Input/Input";
import backIcon from "../../assets/icons/arrow-left.svg";
import { useEffect, useState } from "react";
import Select from "../../UI/Select/Select";
import { getUserById, registration, useUserById } from "../../api/api";
import { useUserStore } from "../../state/UserStore";
import ChooseCar from "./ChooseCar";
import Button from "../../UI/Button/Button";
import { useMap } from "../../state/MapRoutesStore";

export default function Registration({ backFunc, step, nextStep }) {
  const { currentRole, setCurrentUser, currentUser } = useUserStore();
  const { center } = useMap();
  const [userId, setUserId] = useState(null);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState(null);

  const [carNumber, setCarNumber] = useState("");
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carType, setCarType] = useState("");

  const [visibleAvatarPhoto, setVisibleAvatarPhoto] = useState("");
  const [visiblePassportPhoto, setVisiblePassportPhoto] = useState("");
  const [visibleLicensePhoto, setVisibleLicensePhoto] = useState("");

  const [passportPhoto, setPassportPhoto] = useState("");
  const [driverLicensePhoto, setDriverLicensePhoto] = useState("");
  const [formError, setFormError] = useState({});

  const navigate = useNavigate();
  const nameRegex = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ'’\- ]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function urlToFile(url) {
    const blob = url.blob();
    const filename = url.split("/").pop().split("#")[0].split("?")[0];
    return new File([blob], filename, { type: blob.type });
  }

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (tg?.initDataUnsafe) {
      const chatId = tg.initDataUnsafe.chat?.id;
      const userId = tg.initDataUnsafe.user?.id;
      setUserId(chatId || userId);
    }
  }, []);

  useEffect(() => {
    if (currentUser && currentRole === "driver") {
      setAvatar(urlToFile(currentUser.profile_photo));
      setPassportPhoto(currentUser.passport_photo);
      setCity(currentUser.city);
      setName(currentUser.name);
      setPhone(currentUser.phone_number);
      setEmail(currentUser.email);
      setVisibleAvatarPhoto(currentUser.profile_photo);
      setVisiblePassportPhoto(currentUser.passport_photo);
    }
  }, [currentUser, currentRole]);

  const validateStep = () => {
    const errors = {};

    if (currentRole === "driver") {
      switch (step) {
        case 0:
          if (!name || !nameRegex.test(name)) errors.name = "Имя обязательно (2-50 символов)";
          if (!isValidPhoneNumber(phone)) errors.phone = "Неверный формат телефона";
          if (!email || !emailRegex.test(email)) errors.email = "Некорректная почта";
          if (!city) errors.city = "Выберите город";
          if (!avatar) errors.avatar = "Загрузите аватар";
          break;
        case 1:
          if (!passportPhoto) errors.passport = "Загрузите фото паспорта";
          if (!driverLicensePhoto) errors.license = "Загрузите водительское удостоверение";
          break;
        case 2:
          if (!carNumber.trim()) errors.carNumber = "Введите номер авто";
          if (!carModel.trim()) errors.carModel = "Введите модель";
          if (!carMake.trim()) errors.carMake = "Введите марку";
          if (!carColor.trim()) errors.carColor = "Введите цвет";
          if (!carType) errors.carType = "Выберите тип авто";
          break;
        default:
          break;
      }
    } else {
      if (!name || !nameRegex.test(name)) errors.name = "Имя обязательно (2-50 символов)";
      if (!isValidPhoneNumber(phone)) errors.phone = "Неверный формат телефона";
      if (!email || !emailRegex.test(email)) errors.email = "Некорректная почта";
      if (!city) errors.city = "Выберите город";
      if (!avatar) errors.avatar = "Загрузите аватар";
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep()) return;

    if ((currentRole === "driver" && step < 2) || (currentRole === "passenger" && step < 0)) {
      nextStep();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("telegram_id", userId);
      formData.append("phone_number", phone);
      formData.append("name", name);
      formData.append("city", city);
      formData.append("email", email);
      formData.append("profile_photo", avatar);
      if (currentRole === "driver") {
        formData.append("passport_photo", passportPhoto);
        formData.append("driver_license", driverLicensePhoto);
        formData.append("car_number", carNumber);
        formData.append("car_model", carModel);
        formData.append("car_make", carMake);
        formData.append("car_color", carColor);
        formData.append("car_type", carType);
      }
      console.log(
        formData.get("passport_photo"),
        formData.get("driver_license"),
        formData.get("car_number"),
        formData.get("car_model"),
        formData.get("car_make"),
        formData.get("car_color"),
        formData.get("car_type"),
      );
      await registration(formData, currentRole);
      const { data } = await getUserById(userId);
      setCurrentUser(data);
      navigate("/main");
    } catch (error) {
      setFormError({ general: error.message || "Неизвестная ошибка" });
    }
  };

  const handleCityChange = (value) => setCity(value);
  const handlePhoneChange = (value) => setPhone(value);

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
    setVisibleAvatarPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handlePassportChange = (e) => {
    setPassportPhoto(e.target.files[0]);
    setVisiblePassportPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleLicenseChange = (e) => {
    setDriverLicensePhoto(e.target.files[0]);
    setVisibleLicensePhoto(URL.createObjectURL(e.target.files[0]));
  };

  const renderTitle = () => {
    if (step === 0) return "Профиль";
    if (step === 1) return "Данные";
    if (step === 2) return "Автомобиль";
  };

  useEffect(() => {
    setFormError({});
  }, [step]);

  return (
    <main className='px-5 flex flex-col relative w-full h-screen'>
      <header className='pt-[30px] flex items-center mb-12'>
        <button
          className='absolute flex items-center'
          onClick={backFunc}>
          <img
            src={backIcon}
            alt='Назад'
          />
          <p className='pl-4'>Назад</p>
        </button>
        <h1 className='w-full text-center text-2xl leading-6'>{renderTitle()}</h1>
      </header>

      <form
        encType='multipart/form-data'
        onSubmit={handleSubmit}
        className='flex flex-col gap-5 justify-center items-center container-custom'>
        {step === 0 && (
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
              <Select
                selectedValue={city}
                options={["село Майма", "Горно-Алтайск", "село Манжерок", "село Ая"]}
                placeholder='Город'
                onChange={handleCityChange}
              />
              {formError.city && <p className='text-red-500 text-sm mt-1'>{formError.city}</p>}
            </div>
          </>
        )}

        {step === 1 && currentRole === "driver" && (
          <>
            <div className='flex flex-col gap-10 items-center justify-center'>
              <fieldset className='relative'>
                <input
                  id='upload-passport'
                  type='file'
                  accept='image/*'
                  onChange={handlePassportChange}
                  className='visually-hidden'
                />
                <label
                  htmlFor='upload-passport'
                  className='img-upload__label img-upload__control docs'
                  style={{
                    backgroundImage: passportPhoto && `url(${visiblePassportPhoto})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>
                  Загрузить
                </label>
                <span className='block mt-2'>Фото паспорта</span>
                {formError.passport && <p className='text-red-500 text-sm mt-1 text-center'>{formError.passport}</p>}
              </fieldset>

              <fieldset className='relative w-[200px]'>
                <input
                  id='upload-license'
                  type='file'
                  accept='image/*'
                  onChange={handleLicenseChange}
                  className='visually-hidden'
                />
                <label
                  htmlFor='upload-license'
                  className='img-upload__label img-upload__control docs'
                  style={{
                    backgroundImage: driverLicensePhoto && `url(${visibleLicensePhoto})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}>
                  Загрузить
                </label>
                <span className='block mt-2'>Водительское удостоверение</span>
                {formError.license && <p className='text-red-500 text-sm mt-1 text-center'>{formError.license}</p>}
              </fieldset>
            </div>
          </>
        )}

        {step === 2 && currentRole === "driver" && (
          <ChooseCar
            selectedCar={carType}
            setSelectedCar={setCarType}
            setCarNumber={setCarNumber}
            setCarModel={setCarModel}
            setCarMake={setCarMake}
            setCarColor={setCarColor}
            errors={formError}
          />
        )}

        {formError.general && <p className='text-red-500 text-sm'>{formError.general}</p>}

        <Button
          type='submit'
          className='absolute bottom-10'
          size='large'>
          {currentRole === "driver" && step < 2 ? "Далее" : "Завершить"}
        </Button>
      </form>
    </main>
  );
}
