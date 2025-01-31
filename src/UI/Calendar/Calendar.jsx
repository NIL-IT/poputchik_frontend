import "./Calendar.css";
import { useTrip } from "../../state/TripStore";
import { useModal } from "../../state/ModalStore";
import { useState } from "react";
import Button from "../Button/Button";

function CalendarComponent() {
  const { setTripDate, tripDate } = useTrip();
  const { toggleCalendar } = useModal();
  const dayOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [step, setStep] = useState(0);
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

  const today = new Date();

  const renderDays = (monthIndex) => {
    const year = 2025;
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();
    const lastDayOfMonth = new Date(year, monthIndex, daysInMonth).getDay();
    let days = [];
    const prevMonthDays = new Date(year, monthIndex, 0).getDate();

    for (let i = firstDayOfMonth - 1; i > 0; i--) {
      days.push(
        <div
          className='calendar-empty calendar-day'
          key={`prev-${monthIndex}-${i}`}>
          {prevMonthDays - i}
        </div>,
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, monthIndex, i);

      const isPast = currentDate < today;
      const dayClass = isPast ? "calendar-empty calendar-day" : "calendar-day";

      days.push(
        <p
          className={dayClass}
          key={`${monthIndex}-${i}`}
          onClick={isPast ? null : () => handleDayClick(i, monthIndex)}>
          {i}
        </p>,
      );
    }

    for (let i = 1; i <= 7 - lastDayOfMonth; i++) {
      days.push(
        <div
          className='calendar-empty calendar-day'
          key={`next-${monthIndex}-${i}`}>
          {i}
        </div>,
      );
    }

    return days;
  };

  const handleDayClick = (day, monthIndex) => {
    const date = new Date(2025, monthIndex, day);
    setTripDate(date.toISOString());
    setStep(1);
  };
  const handleTimeSubmit = () => {
    if (!tripDate) {
      console.error("No valid date selected");
      return;
    }

    const date = new Date(tripDate);
    if (isNaN(date.getTime())) {
      console.error("Invalid date");
      return;
    }

    const hoursValue = parseInt(hours, 10);
    const minutesValue = parseInt(minutes, 10);

    if (isNaN(hoursValue) || isNaN(minutesValue)) {
      console.error("Invalid time input");
      return;
    }

    date.setHours(hoursValue);
    date.setMinutes(minutesValue);
    setTripDate(date.toISOString());
    toggleCalendar(false);
  };
  console.log(tripDate);
  return (
    <div className=''>
      <h2 className='calendar-title'>Выберите дату</h2>
      <div className='calendar-container'>
        {step === 0 &&
          months.map((month, index) => (
            <div
              key={index}
              className='month'>
              <h3 className='calendar-month'>{month}</h3>

              <div className='calendar-grid'>
                {dayOfWeek.map((item, index) => (
                  <span
                    className='calendar-weekDay'
                    key={index}>
                    {item}
                  </span>
                ))}
                {renderDays(index)}
              </div>
            </div>
          ))}
        {step === 1 && (
          <div className=' flex justify-between flex-col '>
            <div className='flex justify-center items-center gap-4 mb-5'>
              <input
                type='number'
                placeholder='Часы'
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min='0'
                max='23'
                className='text-black w-[120px] p-4 bg-inherit border-2 border-[#f6f6f6]'
              />
              <input
                type='number'
                placeholder='Минуты'
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min='0'
                max='59'
                className='text-black w-[120px] p-4 bg-inherit border-2 border-[#f6f6f6]'
              />
            </div>
            <Button
              size={"large"}
              onClick={handleTimeSubmit}>
              Подтвердить время
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendarComponent;
