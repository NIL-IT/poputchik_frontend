import Header from "../UI/Header/Header";
import { useModal } from "../state/ModalStore";
import BackButton from "../UI/BackButton";
import CreateTrip from "../components/Main/CreateTrip";
import DriveInfo from "../components/Main/DriveInfo";
import DriverList from "../components/Main/DriverList";
import SearchComponent from "../components/Main/SearchComponent";
import MapComponent from "../components/Main/MapComponent";
import { useTrip } from "../state/TripStore";
import { useMap } from "../state/MapRoutesStore";
import { useUserStore } from "../state/UserStore";
import { useTripsList } from "../api/trips";
import { usePassengerList } from "../api/passenger";
import { useList } from "../state/listStore";
import { useEffect } from "react";

export default function MainPage() {
  const { bookedModal, toggleBookedModal, isCreating, setIsCreating } = useModal();
  const { setTripFrom, setTripTo, setTripDate, setPersons, setTripPrice } = useTrip();
  const { setIsRouteEnabled, setStartPoint, setEndPoint } = useMap();
  const { currentUser } = useUserStore();
  const { setMainList, mainList } = useList();
  const isDriver = useUserStore((state) => state.currentRole === "driver");
  const passengerList = usePassengerList(currentUser.driver_profile?.id);
  const tripsList = useTripsList(currentUser.city);

  const driverList = isDriver ? passengerList : tripsList;
  // console.log(driverList);
  useEffect(() => {
    setMainList(driverList);
    console.log(mainList);
  }, [driverList, setMainList]);

  function clearCreatingData() {
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

  function clearBookedData() {
    setIsRouteEnabled(false);
    setStartPoint([]);
    setEndPoint([]);
  }

  const nerbiest =
    driverList && isDriver
      ? driverList &&
        driverList.filter((i) => i.driver_id !== currentUser.driver_profile.id && i.state !== "booked").slice(0, 2)
      : currentUser
      ? driverList &&
        driverList
          .filter(
            currentUser.driver_profile
              ? (i) => i.driver_id !== currentUser.driver_profile.id && i.state !== "booked"
              : (i) => i.state !== "booked",
          )
          .slice(0, 2)
      : [];

  function toggleCreating() {
    setIsCreating((prev) => !prev);
  }

  function renderContent() {
    if (isCreating) {
      return <CreateTrip />;
    } else if (bookedModal) {
      return <DriveInfo />;
    } else {
      return (
        <DriverList
          list={mainList ? mainList.slice(0, 2) : []}
          toggleCreating={toggleCreating}
          isCreating={isCreating}
        />
      );
    }
  }

  function onButtonClick() {
    if (bookedModal) {
      toggleBookedModal(false);
      clearBookedData();
    } else if (isCreating) {
      setIsCreating(false);
      clearCreatingData();
    }
  }

  return (
    <div className='bg-black h-screen relative'>
      {isCreating || bookedModal ? (
        <BackButton
          className='absolute top-[70px] left-5 w-11 h-11 rounded-full flex justify-center items-center bg-[#fff] shadow-btnback z-10'
          onClick={() => onButtonClick()}
        />
      ) : (
        <Header />
      )}
      <SearchComponent />
      <MapComponent />
      {renderContent()}
    </div>
  );
}
