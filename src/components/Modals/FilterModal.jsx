import { useState } from "react";
import Button from "../../UI/Button/Button";
import { useList } from "../../state/listStore";
import Input from "../../UI/Input/Input";
import { useUserStore } from "../../state/UserStore";

export default function FilterModal({ onClose }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errors, setErrors] = useState({});
  const { applyTimeFilter, clearTimeFilter, setIsFiltered, passengerTripsList, driveList } = useList();
  const isDriver = useUserStore((state) => state.currentRole === "driver");
  const validateInputs = () => {
    const newErrors = {};
    const currentDate = new Date();
    const selectedDate = new Date(date);
    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    if (selectedDate < new Date().setHours(0, 0, 0, 0)) {
      newErrors.date = "Нельзя выбрать прошедшую дату";
    }

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    if (selectedDate > maxDate) {
      newErrors.date = "Можно выбрать дату максимум на 30 дней вперед";
    }

    if (startDateTime >= endDateTime) {
      newErrors.time = "Время начала должно быть раньше времени окончания";
    }

    if (selectedDate.toDateString() === currentDate.toDateString()) {
      const currentHour = currentDate.getHours();
      const currentMinutes = currentDate.getMinutes();
      const [startHour, startMinutes] = startTime.split(":").map(Number);

      if (startHour < currentHour || (startHour === currentHour && startMinutes < currentMinutes)) {
        newErrors.time = "Нельзя выбрать прошедшее время";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplyFilter = () => {
    if (date && startTime && endTime && validateInputs()) {
      const listToFilter = isDriver ? passengerTripsList : driveList;
      const startDateTime = new Date(`${date}T${startTime}`);
      const endDateTime = new Date(`${date}T${endTime}`);
      applyTimeFilter(startDateTime, endDateTime, listToFilter);
      setIsFiltered(true);
      onClose();
    }
  };

  const handleReset = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setErrors({});
    clearTimeFilter();
    onClose();
  };

  return (
    <div className='w-[350px] bg-white rounded-lg py-5 px-4 m-4'>
      <div className='flex flex-col justify-between items-center h-full'>
        <div className='w-full space-y-4'>
          <div className='flex flex-col'>
            <label className='text-sm text-gray-600 mb-1 text-center'>Дата</label>
            <Input
              type='date'
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setErrors({});
              }}
              min={new Date().toISOString().split("T")[0]}
              max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]}
              className='w-full py-2 border rounded-md bg-inherit text-center'
            />
            {errors.date && <p className='text-red-500 text-sm mt-1'>{errors.date}</p>}
          </div>

          <div className='flex gap-4'>
            <div className='flex flex-col flex-1'>
              <label className='text-sm text-gray-600 mb-1'>Время от</label>
              <Input
                type='time'
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setErrors({});
                }}
                className='w-full py-2 border rounded-md bg-inherit text-center'
              />
            </div>

            <div className='flex flex-col flex-1'>
              <label className='text-sm text-gray-600 mb-1'>Время до</label>
              <Input
                type='time'
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  setErrors({});
                }}
                className='w-full py-2 border rounded-md bg-inherit text-center'
              />
            </div>
          </div>
          {errors.time && <p className='text-red-500 text-sm text-center'>{errors.time}</p>}
        </div>

        <div className='w-full mt-8'>
          <Button
            onClick={handleApplyFilter}
            classNames='w-full mb-2'
            disabled={!date || !startTime || !endTime}>
            Применить
          </Button>
          <Button
            onClick={handleReset}
            classNames='w-full'>
            Сбросить
          </Button>
        </div>
      </div>
    </div>
  );
}
