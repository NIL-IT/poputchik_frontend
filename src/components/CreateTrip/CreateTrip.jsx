import { motion } from "framer-motion";
import Button from "../Button/Button";
import Input from "../Input/Input";
import { useModal } from "../../state/ModalStore";
import { useTrip } from "../../state/TripStore";
import { useEffect, useState } from "react";
import { useMap } from "../../state/MapRoutesStore";
import { formatDate } from "../../utils/utils";
import { useUserStore } from "../../state/UserStore";
import { createTripByDriver, createTripByPassenger } from "../../api/trips";
import { cleanAddress } from "../../api/api";
import { useList } from "../../state/listStore";

const createTripAnimation = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export default function CreateTrip() {
  const { tripFrom, tripTo, date, persons, price } = useTrip();
  const { setTripFrom, setTripTo, setTripDate, setPersons, setTripPrice } = useTrip();
  const { toggleCalendar, togglePersonModal, toggleSearch, setActiveInput, setIsCreating } = useModal();
  const { setIsRouteEnabled, setStartPoint, setEndPoint, routeDistance, routeDuration } = useMap();
  const { activeList, setActiveList } = useList();
  const { currentUser } = useUserStore();
  const isDriver = useUserStore((state) => state.currentRole === "driver");

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
    setTripPrice(40);
    setIsCreating(false);
    setIsRouteEnabled(false);
    setStartPoint([]);
    setEndPoint([]);
  }

  async function createTrip(event) {
    event.preventDefault();

    if (tripFrom.name.length > 0 && tripTo.name.length > 0 && date && persons && price) {
      if (isDriver) {
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

        try {
          await createTripByDriver(trip);
          setActiveList([...activeList, trip]);
          clearData();
        } catch (error) {
          setFormError(error.message || "Неизвестная ошибка");
        }
      } else {
        const trip = {
          passenger_id: currentUser.passenger_profile.id,
          start_address: tripFrom,
          end_address: tripTo,
          departure_time: date,
          seats_available: 2,
          price: parseInt(price),
          state: "active",
          distance: routeDistance,
          travel_time: routeDuration,
        };

        try {
          await createTripByPassenger(trip);
          setActiveList([...activeList, trip]);
          clearData();
        } catch (error) {
          setFormError(error.message || "Неизвестная ошибка");
        }
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

  useEffect(() => {
    function calculateFare(distanceStr) {
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
      let totalFare = value * grossRatePerKm;

      if (totalFare < 40) {
        totalFare = 40;
      }

      return totalFare.toFixed(2);
    }

    const fare = calculateFare(routeDistance);
    if (fare) {
      setTripPrice(fare);
    }
  }, [routeDistance]);

  return (
    <motion.div
      variants={createTripAnimation}
      initial='initial'
      animate='animate'
      exit='exit'
      className='fixed bottom-0 left-0 right-0 bg-white z-10'>
      <div className='px-5 py-6'>
        <div className='relative w-[350px] mx-auto'>
          <h2 className='text-left font-bold text-[20px] leading-5 mb-6'>Создайте поездку</h2>
          <form
            onSubmit={createTrip}
            encType='application/json'
            className='rounded-[15px] create'>
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
                {isDriver ? (
                  <Input
                    readOnly
                    onChange={() => {}}
                    onClick={() => togglePersonModal(true)}
                    type={"number"}
                    value={Number(persons)}
                  />
                ) : (
                  <Input
                    readOnly
                    onChange={() => {}}
                    onClick={() => {}}
                    type={"number"}
                    value={1}
                  />
                )}
              </div>
              <div className='price'>
                <Input
                  readOnly
                  onChange={() => {}}
                  value={price}
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
      </div>
    </motion.div>
  );
}