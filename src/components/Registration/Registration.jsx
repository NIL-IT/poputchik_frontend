import {  useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import backIcon from "../../assets/icons/arrow-left.svg";
import { useEffect, useState } from "react";
import { urlToFile } from "../../api/api";
import { useUserStore } from "../../state/UserStore";

import Button from "../Button/Button";
import Switcher from "../Switcher/Switcher";
import { getUserById, registration } from "../../api/user";
import RegistrationPhoto from "./components/RegistrationPhoto/RegistrationPhoto";
import { motion } from "framer-motion";
import { swipeLeft } from "../../utils/animation";
import { validateRegistrationStep } from "../../utils/regitarionValidation";
import ChooseCar from "./components/ChooseCar/ChooseCar";
import RegistrationInfo from "./components/RegistrationInfo/RegistrationInfo";
import { useRegistrationStore } from "../../state/useRegistration";

export default function Registration({ backFunc, step, nextStep }) {
  const { currentRole, setCurrentUser, currentUser } = useUserStore();
  const isDriver = currentRole === "driver";
  const [userId, setUserId] = useState(null);
  const {
    name,
    phone,
    email,
    city,
    about,
    avatar,
    visibleAvatarPhoto,
    visiblePassportPhoto,
    visibleLicensePhoto,
    visibleCarPhoto,
    passportPhoto,
    carPhoto,
    driverLicensePhoto,
    carNumber,
    carModel,
    carMake,
    carColor,
    carType,
    privacyAccepted,
    infoAccepted,
    setField
  } = useRegistrationStore();
const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (tg?.initDataUnsafe) {
      const chatId = tg.initDataUnsafe.chat?.id;
      const userId = tg.initDataUnsafe.user?.id;
      setUserId(chatId || userId);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!currentUser || Object.keys(currentUser).length === 0 || currentRole !== "driver") {
        return;
      }
      const profile_photo = await urlToFile(currentUser.profile_photo);
      setField('avatar', profile_photo);
      setField('passportPhoto', currentUser.passport_photo);
      setField('city', currentUser.city);
      setField('name',currentUser.name);
      setField('phone',currentUser.phone_number);
      setField('email',currentUser.email);
      setField('visibleAvatarPhoto',currentUser.profile_photo);
      setField('visiblePassportPhoto',currentUser.passport_photo);
      setField('about', currentUser.info);
    };
    loadData();
  }, [currentUser, currentRole]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateRegistrationStep(
      step,
      {
        name,
        phone,
        email,
        city,
        avatar,
        privacyAccepted,
        infoAccepted,
        passportPhoto,
        driverLicensePhoto,
        carPhoto,
        carNumber,
        carModel,
        carMake,
        carColor,
        carType,
      },
      isDriver,
    );

    setFormError(errors);
    if (Object.keys(errors).length > 0) return;

    if (shouldProceedToNextStep()) {
      nextStep();
      return;
    }

    try {
      setIsLoading(true);
      await submitRegistrationForm();
      navigate("/main");
    } catch (error) {
      setFormError({ general: error.response?.data?.detail || "Неизвестная ошибка" });
    } finally {
      setIsLoading(false);
    }
  };

  const shouldProceedToNextStep = () => {
    return (isDriver && step < 2) || (currentRole === "passenger" && step < 0);
  };

  const submitRegistrationForm = async () => {
    const formData = new FormData();
    formData.append("telegram_id", userId);
    formData.append("phone_number", phone);
    formData.append("name", name);
    formData.append("city", city);
    formData.append("email", email);
    formData.append("profile_photo", avatar);
    formData.append("info", about);
    formData.append("register_date", new Date().toISOString());
    if (isDriver) {
      formData.append("passport_photo", passportPhoto);
      formData.append("driver_license", driverLicensePhoto);
      formData.append("car_number", carNumber);
      formData.append("car_photo", carPhoto);

      formData.append("car_model", carModel);
      formData.append("car_make", carMake);
      formData.append("car_color", carColor);
      formData.append("car_type", carType);
    }
    await registration(formData, currentRole);
    if (isDriver && !currentUser.passenger_profile) {
      await registration(formData, "passenger");
    }
    const { data } = await getUserById(userId);
    setCurrentUser(data);
  };

  const handleCityChange = (value) => setField('city',value);
  const handlePhoneChange = (value) => setField('phone',value);
  const handleFileChange = (e) => {
    setField('avatar', e.target.files[0]);
    setField('visibleAvatarPhoto', URL.createObjectURL(e.target.files[0]));
  };

  const handlePassportChange = (e) => {
    setField('passportPhoto', e.target.files[0]);
    setField('visiblePassportPhoto', URL.createObjectURL(e.target.files[0]));
  };

  const handleLicenseChange = (e) => {
    setField('driverLicensePhoto',e.target.files[0]);
    setField('visibleLicensePhoto',URL.createObjectURL(e.target.files[0]));
  };

  const handleCarChange = (e) => {
    setField('carPhoto', e.target.files[0]);
    setField('visibleCarPhoto',URL.createObjectURL(e.target.files[0]));
  };

  const renderTitle = () => {
    if (step === 0) return "Профиль";
    if (step === 1) return "Данные";
    if (step === 2) return "Автомобиль";
  };

  useEffect(() => {
    setFormError({});
  }, [step]);

  const infoProps = {
    handleFileChange,
    avatar,
    visibleAvatarPhoto,
    formError,
    name,
    phone,
    handlePhoneChange,
    email,
    about,
    city,
    handleCityChange,
    privacyAccepted,
    infoAccepted,
  };
  const photoProps = {
    handlePassportChange,
    passportPhoto,
    visiblePassportPhoto,
    formError,
    handleLicenseChange,
    driverLicensePhoto,
    visibleLicensePhoto,
    handleCarChange,
    carPhoto,
    visibleCarPhoto,
  };
  const carProps = {
    selectedCar: carType,
    carNumber,
    carModel,
    carMake,
    carColor,
    formError,
  };

  return (
    <main className='container-custom px-5 flex flex-col justify-between pb-6 relative w-full min-h-screen'>
      <div>
        <header className='pt-[66px] flex items-center mb-1'>
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
          className=''>
          {step === 0 && (
            <motion.div
              className='flex flex-col gap-5 justify-center items-center container-custom'
              key='registration-info'
              variants={swipeLeft}
              initial='initial'
              animate='animate'
              exit='exit'>
              <RegistrationInfo {...infoProps} />
            </motion.div>
          )}

          {step === 1 && isDriver && (
            <motion.div
              className='flex flex-col gap-5 justify-center items-center container-custom'
              key='registration-photo'
              variants={swipeLeft}
              initial='initial'
              animate='animate'
              exit='exit'>
              <RegistrationPhoto {...photoProps} />
            </motion.div>
          )}

          {step === 2 && isDriver && (
            <motion.div
              className='flex flex-col gap-5 justify-center items-center container-custom'
              key='registration-car'
              variants={swipeLeft}
              initial='initial'
              animate='animate'
              exit='exit'>
              <ChooseCar {...carProps} />
            </motion.div>
          )}

          {formError.general && <p className='text-red-500 text-sm'>{formError.general}</p>}
        </form>
      </div>
      <div className='mt-10 mb-5'>
        <Button
          type='submit'
          onClick={handleSubmit}
          classNames=' mb-10'
          size='large'>
          {isDriver && step < 2 ? "Далее" : "Завершить"}
        </Button>
        <Switcher position={step} />
      </div>
    </main>
  );
}
