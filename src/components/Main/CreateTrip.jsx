import Button from "../../UI/Button/Button";
import Footer from "../../UI/Footer/Footer";
import Input from "../../UI/Input/Input";
import { useModal } from "../../state/ModalStore";
import { useTrip } from "../../state/TripStore";
import { useEffect, useState } from "react";
import { createTripByDriver } from "../../api/api";
import { useMap } from "../../state/MapRoutesStore";
import { formatDate } from "../../utils/utils";
export default function CreateTrip() {
  const { tripFrom, tripTo, date, persons, price } = useTrip();
  const { setTripFrom, setTripTo, setTripDate, setPersons, setTripPrice } = useTrip();
  const { toggleCalendar, togglePersonModal, togglePrice, toggleSearch, setActiveInput, setIsCreating } = useModal();
  const { setIsRouteEnabled, setStartPoint, setEndPoint } = useMap();
  const [formError, setFormError] = useState("");

  function openSearch(value) {
    toggleSearch(true);
    setActiveInput(value);
  }

  function clearData() {
    setTripFrom({
      name: "",
      coordinates: {
        latitude: "",
        longitude: "",
      },
    });
    setTripTo({
      name: "",
      coordinates: {
        latitude: "",
        longitude: "",
      },
    });
    setTripDate("");
    setPersons(1);
    setTripPrice(500);
    setIsCreating(false);
    setIsRouteEnabled(false);
    setStartPoint([]);
    setEndPoint([]);
  }

  async function createTrip(e) {
    e.preventDefault();
    if (tripFrom.name.length > 0 && tripTo.name.length > 0 && date && persons && price) {
      const trip = {
        driver_id: 1,
        start_address: tripFrom,
        end_address: tripTo,
        departure_time: date,
        seats_available: parseInt(persons),
        price: parseInt(price),
        state: "active",
      };
      console.log(JSON.stringify(trip));

      try {
        await createTripByDriver(trip).then(() => clearData());
      } catch (error) {
        setFormError(error.message || "Неизвестная ошибка");
      }
    } else {
      setFormError("Заполните форму");
    }
  }
  useEffect(() => {
    if (tripFrom.name.length > 0 && tripTo.name.length > 0) {
      setStartPoint([tripFrom.coordinates.lattitude, tripFrom.coordinates.longitude]);
      setEndPoint([tripTo.coordinates.lattitude, tripTo.coordinates.longitude]);

      setIsRouteEnabled(true);
    }
  }, [tripFrom, tripTo]);

  return (
    <Footer className={`bg-[#F6F6F6] px-5 flex justify-center`}>
      <div className='relative w-[350px]'>
        <h2 className='text-left font-bold text-[20px] leading-5 mb-6 '>Создайте поездку</h2>
        <form
          onSubmit={createTrip}
          encType='application/json'
          className='rounded-[15px] create '>
          <div className='first geo'>
            <Input
              readOnly
              placeholder={"откуда"}
              value={tripFrom.name}
              onChange={() => {}}
              onClick={() => openSearch("from")}
            />
          </div>
          <div className='geo'>
            <Input
              readOnly
              placeholder={"куда"}
              value={tripTo.name}
              onChange={() => {}}
              onClick={() => openSearch("to")}
            />
          </div>
          <div className='date'>
            <Input
              readOnly
              onClick={() => toggleCalendar(true)}
              value={date.length > 0 ? formatDate(date) : "00.00.00"}
              onChange={() => {}}
              type={"text"}
              placeholder={"00.00.00"}
            />
          </div>
          <div className='person'>
            <Input
              readOnly
              onChange={() => {}}
              onClick={() => togglePersonModal(true)}
              type={"number"}
              value={Number(persons)}
            />
          </div>
          <div className='price'>
            <Input
              readOnly
              onClick={() => togglePrice(true)}
              type={"number"}
              onChange={() => {}}
              value={price}
            />
          </div>
          {formError ? <>{formError}</> : <></>}
          <Button
            type='submit'
            size={"large"}
            classNames={"btn-form"}>
            Сохранить
          </Button>
        </form>
      </div>
    </Footer>
  );
}
