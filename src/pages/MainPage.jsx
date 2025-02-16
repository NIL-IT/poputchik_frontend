import { motion, AnimatePresence } from "framer-motion";
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
import { useList } from "../state/listStore";
import AnimatedRoute from "../components/Wrappers/AnimatedRoute";
import { headerAnimation, searchAnimation, backButtonAnimation, slideUpIn } from "../utils/animation";

export default function MainPage() {
  const { bookedModal, toggleBookedModal, isCreating, setIsCreating } = useModal();
  const { setTripFrom, setTripTo, setTripDate, setPersons, setTripPrice } = useTrip();
  const { setIsRouteEnabled, setStartPoint, setEndPoint } = useMap();
  const { mainList } = useList();

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

  function renderContent() {
    if (isCreating) {
      return (
        <AnimatedRoute variants={slideUpIn}>
          <CreateTrip />
        </AnimatedRoute>
      );
    } else if (bookedModal) {
      return (
        <AnimatedRoute variants={slideUpIn}>
          <DriveInfo />
        </AnimatedRoute>
      );
    } else {
      return (
        <AnimatedRoute variants={slideUpIn}>
          <DriverList
            list={mainList ? mainList.slice(0, 2) : []}
            toggleCreating={toggleCreating}
            isCreating={isCreating}
          />
        </AnimatedRoute>
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
      <AnimatePresence mode='wait'>
        {isCreating || bookedModal ? (
          <motion.div
            key='back-button'
            variants={backButtonAnimation}
            initial='initial'
            animate='animate'
            exit='exit'
            className='absolute top-[70px] left-5 z-10'>
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
              list={mainList ? mainList.slice(0, 2) : []}
              toggleCreating={toggleCreating}
              isCreating={isCreating}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
