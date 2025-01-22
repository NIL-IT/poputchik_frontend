import "./Calendar.css";
import { useTrip } from "../../state/TripStore";
import { useModal } from "../../state/ModalStore";

function CalendarComponent() {
  const { setTripDate } = useTrip();
  const { toggleCalendar } = useModal();
  const dayOfWeek = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

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
      days.push(
        <p
          className='calendar-day'
          key={`${monthIndex}-${i}`}
          onClick={() => handleDayClick(i, monthIndex)}>
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
    const formattedDate = date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setTripDate(formattedDate);
    toggleCalendar(false);
  };

  return (
    <div>
      <h2 className='calendar-title'>Выберите дату</h2>
      <div className='calendar-container'>
        {months.map((month, index) => (
          <div
            key={index}
            className='month'>
            <h3 className='calendar-month'>{month}</h3>

            <div className='calendar-grid'>
              {dayOfWeek.map((item, index) => {
                return (
                  <span
                    className='calendar-weekDay'
                    key={index}>
                    {item}
                  </span>
                );
              })}
              {renderDays(index)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarComponent;
