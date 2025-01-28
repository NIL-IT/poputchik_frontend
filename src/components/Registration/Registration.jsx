import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Input from "../../UI/Input/Input";
import backIcon from "../../assets/icons/arrow-left.svg";
import { useEffect, useState } from "react";
import Select from "../../UI/Select/Select";
import { registration, useUserById } from "../../api/api";
import { useUserStore } from "../../state/UserStore";
import ChooseCar from "./ChooseCar";
import Button from "../../UI/Button/Button";
import { useMap } from "../../state/MapRoutesStore";

export default function Registration({ backFunc, step, nextStep }) {
  const { currentRole, setCurrentUser } = useUserStore();
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
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();
  const regex = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ'’\- ]{2,50}$/;

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (!tg) {
      console.log("Not in Telegram environment");
      return;
    }

    tg.ready();

    if (tg.initDataUnsafe) {
      const chatId = tg.initDataUnsafe.chat?.id;
      const userId = tg.initDataUnsafe.user?.id;

      if (chatId) {
        console.log("Working in chat context, ID:", chatId);
        setUserId(chatId);
      } else if (userId) {
        console.log("Personal chat with user ID:", userId);
        setUserId(userId);
      }
    }
  }, []);

  function renderTitle() {
    if (step == 0) {
      return `Профиль ${(userId, center)}`;
    } else if (step == 1) {
      return `Данные ${userId}`;
    } else if (step == 2) {
      return "Автомобиль";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 1 && currentRole == "passenger") {
      nextStep();
    } else if (step < 2 && currentRole == "driver") {
      nextStep();
    } else {
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
        formData.append("telegram_id", userId);
        formData.append("profile_photo", avatar);
        formData.append("name", name);
        formData.append("phone_number", phone);
        formData.append("email", email);
        formData.append("city", city);
        formData.append("passport_photo", passportPhoto);
        if (currentRole === "driver") {
          formData.append("car_photo", passportPhoto);
          formData.append("driver_license", driverLicensePhoto);
          formData.append("car_number", carNumber);
          formData.append("car_model", carModel);
          formData.append("car_make", carMake);
          formData.append("car_color", carColor);
          formData.append("car_type", carType);
        }

        try {
          console.log("first");
          await registration(formData, currentRole).then(() => {
            setCurrentUser(useUserById(userId).data);
            navigate("/main");
          });
        } catch (error) {
          setFormError(error.message || "Неизвестная ошибка");
        }
      }
    }
    console.log(
      avatar,
      name,
      phone,
      email,
      city,
      passportPhoto,
      driverLicensePhoto,
      carNumber,
      carModel,
      carMake,
      carColor,
      carType,
    );
  };
  const submitButton = (e) => {
    e.preventDefault();
    if (currentRole == "passenger" && step == 1) {
      handleSubmit();
    } else if (currentRole == "driver" && step == 2) {
      handleSubmit();
    }
    nextStep();
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
  console.log(step);
  return (
    <main className='px-5 flex flex-col relative w-full h-screen'>
      <header className='pt-[30px] flex items-center mb-12'>
        <button
          to='/'
          className='absolute flex items-center'
          onClick={() => backFunc()}>
          <img
            className='block'
            src={backIcon}
            alt=''
          />
          <p className='pl-4'>Назад</p>
        </button>
        <h1 className='w-full text-center text-2xl leading-6'>{renderTitle()}</h1>
      </header>
      <form
        encType='multipart/form-data'
        onSubmit={handleSubmit}
        className='flex flex-col gap-5 justify-center items-center  container-custom'
        action='#'>
        {step == 0 && (
          <>
            <fieldset className='w-[121px] h-[121px] mb-10'>
              <input
                id='upload-file'
                className='visually-hidden'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
              />
              <label
                style={{
                  backgroundImage: avatar ? `url(${visibleAvatarPhoto})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
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
              options={["село Майма", "Горно-Алтайск", "село Манжерок", "село Ая"]}
              placeholder='Город'
              value={city}
              onChange={handleCityChange}
            />

            <footer className='absolute bottom-[30px] flex flex-col '>
              {formError && (
                <span
                  className='mb-5'
                  style={{ color: "red" }}>
                  {formError}
                </span>
              )}
            </footer>
          </>
        )}

        {step == 1 && (
          <div className='flex flex-col gap-5 items-center'>
            <fieldset className='mb-10'>
              <input
                id='upload-file'
                className='visually-hidden'
                type='file'
                accept='image/*'
                onChange={handlePassportChange}
              />
              <label
                style={{
                  backgroundImage: passportPhoto ? `url(${visiblePassportPhoto})` : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                htmlFor='upload-file'
                className='img-upload__label  img-upload__control docs'>
                Загрузить
              </label>
              <span>Загрузить фото пасспорта</span>
            </fieldset>

            {currentRole == "driver" && (
              <>
                <fieldset className='mb-10 w-[121px]'>
                  <input
                    id='upload-license'
                    className='visually-hidden'
                    type='file'
                    accept='image/*'
                    onChange={handleLicenseChange}
                  />
                  <label
                    style={{
                      backgroundImage: driverLicensePhoto ? `url(${visibleLicensePhoto})` : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    htmlFor='upload-license'
                    className='img-upload__label  img-upload__control docs'>
                    Загрузить
                  </label>
                  <span>Загрузить фото водительского удостоверения</span>
                </fieldset>
              </>
            )}
          </div>
        )}
        {step === 2 && currentRole == "driver" && (
          <ChooseCar
            selectedCar={carType}
            setSelectedCar={setCarType}
            setCarNumber={setCarNumber}
            setCarModel={setCarModel}
            setCarMake={setCarMake}
            setCarColor={setCarColor}
          />
        )}
        <Button
          type='submit'
          classNames='absolute bottom-10'
          size={"large"}>
          Продолжить
        </Button>
      </form>
    </main>
  );
}
