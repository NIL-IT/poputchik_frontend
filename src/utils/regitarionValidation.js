import { isValidPhoneNumber } from "libphonenumber-js";

export const nameRegex = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ''\- ]{2,50}$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistrationStep = (step, data, isDriver) => {
  const errors = {};

  if (isDriver) {
    switch (step) {
      case 0:
        if (!data.name || !nameRegex.test(data.name)) errors.name = "Имя обязательно (2-50 символов)";
        if (!isValidPhoneNumber(data.phone)) errors.phone = "Неверный формат телефона";
        if (!data.email || !emailRegex.test(data.email)) errors.email = "Некорректная почта";
        if (!data.city) errors.city = "Выберите город";
        if (!data.avatar) errors.avatar = "Загрузите аватар";
        if (!data.privacyAccepted) errors.privacy = "Необходимо принять политику конфиденциальности";
        break;
      case 1:
        if (!data.passportPhoto) errors.passport = "Загрузите фото паспорта";
        if (!data.driverLicensePhoto) errors.license = "Загрузите водительское удостоверение";
        if (!data.carPhoto) errors.carPhoto = "Загрузите фото машины";
        break;
      case 2:
        if (!data.carNumber.trim()) errors.carNumber = "Введите номер авто";
        if (!data.carModel.trim()) errors.carModel = "Введите модель";
        if (!data.carMake.trim()) errors.carMake = "Введите марку";
        if (!data.carColor.trim()) errors.carColor = "Введите цвет";
        if (!data.carType) errors.carType = "Выберите тип авто";
        break;
      default:
        break;
    }
  } else {
    if (!data.name || !nameRegex.test(data.name)) errors.name = "Имя обязательно (2-50 символов)";
    if (!isValidPhoneNumber(data.phone)) errors.phone = "Неверный формат телефона";
    if (!data.email || !emailRegex.test(data.email)) errors.email = "Некорректная почта";
    if (!data.city) errors.city = "Выберите город";
    if (!data.avatar) errors.avatar = "Загрузите аватар";
  }

  return errors;
};
