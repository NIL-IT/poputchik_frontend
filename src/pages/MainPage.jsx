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

export default function MainPage() {
  const { bookedModal, toggleBookedModal, isCreating, setIsCreating } = useModal();
  const { setTripFrom, setTripTo, setTripDate, setPersons, setTripPrice } = useTrip();
  const { setIsRouteEnabled, setStartPoint, setEndPoint } = useMap();
  const { currentUser, currentRole } = useUserStore();

  const driverList =
    currentRole === "driver" ? usePassengerList(currentUser.driver_profile?.id) : useTripsList(currentUser.city);

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

  const nerbiest = driverList
    ? (currentUser.driver_profile
        ? driverList.filter((i) => i.driver_id !== currentUser.driver_profile.id)
        : driverList
      ).slice(0, 2)
    : [];
  // console.log(nerbiest);

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
          list={driverList ? nerbiest : []}
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
      {isCreating || bookedModal ? <BackButton onClick={() => onButtonClick()} /> : <Header />}
      <SearchComponent />
      <MapComponent />
      {renderContent()}
    </div>
  );
}
