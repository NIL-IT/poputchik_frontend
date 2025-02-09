import Button from "../../UI/Button/Button";
import Footer from "../../UI/Footer/Footer";
import Input from "../../UI/Input/Input";
import { useModal } from "../../state/ModalStore";
import { useTrip } from "../../state/TripStore";
import { useEffect, useState } from "react";

import { useMap } from "../../state/MapRoutesStore";
import { formatDate } from "../../utils/utils";
import { useUserStore } from "../../state/UserStore";
import { createTripByDriver } from "../../api/trips";
import { cleanAddress } from "../../api/api";
export default function CreateTrip() {
  const { tripFrom, tripTo, date, persons, price } = useTrip();
  const { setTripFrom, setTripTo, setTripDate, setPersons, setTripPrice } = useTrip();
  const { toggleCalendar, togglePersonModal, togglePrice, toggleSearch, setActiveInput, setIsCreating } = useModal();
  const { setIsRouteEnabled, setStartPoint, setEndPoint, routeDistance, routeDuration } = useMap();
  const { currentUser } = useUserStore();

  const [step, setStep] = useState(0);
  const [tripText, setTripText] = useState("");
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
    // setStep(0);
  }

  async function createTrip(event) {
    event.preventDefault();

    if (tripFrom.name.length > 0 && tripTo.name.length > 0 && date && persons && price) {
      const trip = {
        driver_id: currentUser.driver_profile.id,
        start_address: tripFrom,
        end_address: tripTo,
        departure_time: date,
        seats_available: parseInt(persons),
        price: parseInt(price),
        state: "active",
        distance: routeDistance,
        travel_time: routeDuration,
      };
      console.log(JSON.stringify(trip));

      try {
        await createTripByDriver(trip);
        clearData();
      } catch (error) {
        setFormError(error.message || "Неизвестная ошибка");
      }
    } else {
      setFormError("Заполните форму");
    }
  }

  useEffect(() => {
    if (tripFrom.name.length > 0 && tripTo.name.length > 0) {
      setStartPoint([tripFrom.coordinates.latitude, tripFrom.coordinates.longitude]);
      setEndPoint([tripTo.coordinates.latitude, tripTo.coordinates.longitude]);

      setIsRouteEnabled(true);
    }
  }, [tripFrom, tripTo]);

  function calculateTripFare(distanceStr) {
    if (!distanceStr || typeof distanceStr !== "string") {
      return "";
    }

    const regex = /([\d.,]+)\s*(к?м)/i;
    const match = distanceStr.match(regex);

    if (!match) {
      return "";
    }

    let value = parseFloat(match[1].replace(",", "."));
    let unit = match[2].toLowerCase();

    if (unit === "м") {
      value = value / 1000;
    }

    const grossRatePerKm = 15 / 0.95;
    const totalFare = value * grossRatePerKm;

    return totalFare.toFixed(2) + " руб";
  }

  return (
    <Footer className={`bg-[#fff] px-5 flex justify-center`}>
      <div className='relative w-[350px]'>
        <h2 className='text-left font-bold text-[20px] leading-5 mb-6 '>Создайте поездку</h2>
        <form
          onSubmit={createTrip}
          encType='application/json'
          className='rounded-[15px] create '>
          <>
            <div className='first geo'>
              <Input
                readOnly
                placeholder={"откуда"}
                value={cleanAddress(tripFrom.name)}
                onChange={() => {}}
                onClick={() => openSearch("from")}
              />
            </div>
            <div className='geo'>
              <Input
                readOnly
                placeholder={"куда"}
                value={cleanAddress(tripTo.name)}
                onChange={() => {}}
                onClick={() => openSearch("to")}
              />
            </div>
            <div className='date'>
              <Input
                readOnly
                onClick={() => toggleCalendar(true)}
                value={date.length > 0 ? formatDate(date, true) : "00.00.00"}
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
                // onClick={() => togglePrice(true)}
                // type={"number"}
                onChange={() => {}}
                value={calculateTripFare(routeDistance)}
              />
            </div>
          </>

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
