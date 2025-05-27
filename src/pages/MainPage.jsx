import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header/Header";
import { useModal } from "../state/ModalStore";
import BackButton from "../components/NavigationButton/components/BackButton/BackButton";

import { useTrip } from "../state/TripStore";
import { useMap } from "../state/MapRoutesStore";
import { headerAnimation, searchAnimation, backButtonAnimation, slideUpIn } from "../utils/animation";
import DriverList from "../components/DriverList/DriverList";
import DriveInfo from "../components/DriveInfo/DriveInfo";
import CreateTrip from "../components/CreateTrip/CreateTrip";
import MapComponent from "../components/Map/MapComponent";
import SearchComponent from "../components/SearchComponent/SearchComponent";


export default function MainPage() {

  const { bookedModal, toggleBookedModal, isCreating, setIsCreating } = useModal();
  const { setTripFrom, setTripTo, setTripDate, setPersons, setTripPrice } = useTrip();
  const { setIsRouteEnabled, setStartPoint, setEndPoint } = useMap();

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

  function toggleCreating() {
    setIsCreating((prev) => !prev);
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
      <AnimatePresence mode='wait'>
        {isCreating || bookedModal ? (
          <motion.div
            key='back-button'
            variants={backButtonAnimation}
            initial='initial'
            animate='animate'
            exit='exit'
            className='absolute top-[90px] left-5 z-10'>
            <BackButton
              className='w-11 h-11 rounded-full flex justify-center items-center bg-[#fff] shadow-btnback'
              onClick={() => onButtonClick()}
            />
          </motion.div>
        ) : (
          <motion.div
            key='header'
            variants={headerAnimation}
            initial='initial'
            animate='animate'
            exit='exit'>
            <Header />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={searchAnimation}
        initial='initial'
        animate='animate'>
        <SearchComponent />
      </motion.div>

      <MapComponent />

      <AnimatePresence mode='wait'>
        {isCreating && <CreateTrip />}
        {bookedModal && (
          <motion.div
            key='drive-info'
            variants={slideUpIn}
            initial='initial'
            animate='animate'
            exit='exit'>
            <DriveInfo />
          </motion.div>
        )}
        {!isCreating && !bookedModal && (
          <motion.div
            key='driver-list'
            variants={slideUpIn}
            initial='initial'
            animate='animate'
            exit='exit'>
            <DriverList
              toggleCreating={toggleCreating}
              isCreating={isCreating}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
