import "./Calendar.css";
import { useTrip } from "../../../../state/TripStore";
import { useModal } from "../../../../state/ModalStore";
import { useState } from "react";
import Button from "../../../Button/Button";
import Input from "../../../Input/Input";

function CalendarComponent() {
  const { setTripDate } = useTrip();
  const { toggleCalendar } = useModal();

  const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const [selectedDate, setSelectedDate] = useState(null);
  const [step, setStep] = useState(0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const renderDays = (monthIndex) => {
    const year = 2025;
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const getWeekDayIndex = (date) => {
      const jsDay = date.getDay();
      return jsDay === 0 ? 6 : jsDay - 1;
    };

    const firstWeekDayIndex = getWeekDayIndex(firstDayOfMonth);
    const days = [];

    if (firstWeekDayIndex > 0) {
      const prevMonthLastDate = new Date(year, monthIndex, 0).getDate();
      for (let i = firstWeekDayIndex; i > 0; i--) {
        days.push(
          <div
            className='calendar-empty calendar-day'
            key={`prev-${monthIndex}-${i}`}>
            {prevMonthLastDate - i + 1}
          </div>,
        );
      }
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, monthIndex, i);
      currentDate.setHours(0, 0, 0, 0);
      const isPast = currentDate < today;
      const dayClass = isPast ? "calendar-empty calendar-day" : "calendar-day";

      days.push(
        <p
          className={dayClass}
          key={`${monthIndex}-${i}`}
          onClick={!isPast ? () => handleDayClick(i, monthIndex) : undefined}>
          {i}
        </p>,
      );
    }

    const lastDayDate = new Date(year, monthIndex, daysInMonth);
    const lastWeekDayIndex = getWeekDayIndex(lastDayDate);
    if (lastWeekDayIndex < 6) {
      for (let i = 1; i <= 6 - lastWeekDayIndex; i++) {
        days.push(
          <div
            className='calendar-empty calendar-day'
            key={`next-${monthIndex}-${i}`}>
            {i}
          </div>,
        );
      }
    }

    return days;
  };

  const handleDayClick = (day, monthIndex) => {
    const date = new Date(2025, monthIndex, day);
    date.setHours(0, 0, 0, 0);
    setSelectedDate(date);
    setTripDate(date.toISOString());
    setStep(1);
  };

  const handleTimeChange = (e) => {
    if (!selectedDate) {
      console.error("Нет выбранной даты");
      return;
    }

    const timeValue = e.target.value;
    const [hoursStr, minutesStr, secondsStr = "0"] = timeValue.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const seconds = parseInt(secondsStr, 10);

    const updatedDate = new Date(selectedDate);
    updatedDate.setHours(hours, minutes, seconds);
    setSelectedDate(updatedDate);
    setTripDate(updatedDate.toISOString());
  };

  const handleTimeSubmit = () => {
    if (!selectedDate) {
      console.error("Нет выбранной даты");
      return;
    }
    toggleCalendar(false);
  };

  return (
    <div className='calendar-wrapper'>
      {step === 0 && (
        <>
          <h2 className='calendar-title'>Выберите дату</h2>
          <div className='calendar-container'>
            {months.map((month, index) => (
              <div
                key={index}
                className='month'>
                <h3 className='calendar-month'>{month}</h3>
                <div className='calendar-grid'>
                  {weekDays.map((day, idx) => (
                    <span
                      className='calendar-weekDay'
                      key={idx}>
                      {day}
                    </span>
                  ))}
                  {renderDays(index)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {step === 1 && (
        <div className='time-selection flex flex-col items-center gap-4'>
          <h2 className='calendar-title'>Выберите время</h2>
          <Input
            onChange={handleTimeChange}
            type='time'
            step='60'
          />
          <Button
            size='large'
            onClick={handleTimeSubmit}>
            Подтвердить время
          </Button>
        </div>
      )}
    </div>
  );
}

export default CalendarComponent;
