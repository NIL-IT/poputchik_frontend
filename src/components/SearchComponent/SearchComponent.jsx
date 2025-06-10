import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useModal } from "../../state/ModalStore";
import SearchList from "./components/SearchList/SearchList";
import CloseBtn from "../NavigationButton/components/CloseBtn/CloseBtn";
import { useMap } from "../../state/MapRoutesStore";
import { API_KEY } from "../../api/api";

const searchAnimation = {
  container: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren",
      },
    },
  },
  item: {
    initial: { y: -20, opacity: 0 },
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
      y: -20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
};

export default function SearchComponent({ onLocClick }) {
  const { isSearchOpen, toggleSearch } = useModal();
  const [searchValue, setSearchValue] = useState("");
  const { cities, setCities } = useMap();
  const [options, setOptions] = useState([]);
  const closeSearch = () => {
    toggleSearch(false);
    setSearchValue("");
  };
  async function searchLocation() {
    try {
      if (searchValue) {
        const res = await fetch(
          `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${searchValue}&lang=ru_RU`,
        );
        const data = await res.json();

        const collection = data.response.GeoObjectCollection.featureMember
          .filter((item) => {
            const kind = item.GeoObject.metaDataProperty.GeocoderMetaData.kind;
            return ["locality", "street", "house"].includes(kind);
          })
          .map((item) => item.GeoObject);

        setOptions(() => collection);
      } else if (searchValue.length < 1) {
        setOptions([]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          variants={searchAnimation.container}
          initial='initial'
          animate='animate'
          exit='exit'
          className='pt-[70px] absolute z-20 h-full w-full bg-white py-8 flex flex-col'>
          <div className='searchBig-container container-custom'>
            <motion.div
              variants={searchAnimation.item}
              className='searchBig-wrapper'>
              <label
                htmlFor='searchBig'
                className='searchBig-label'
                onClick={searchLocation}
              />
              <input
                className='searchBig-input'
                id='searchBig'
                type='text'
                placeholder='Поиск'
                autoComplete='off'
                value={typeof searchValue === "object" && searchValue !== null ? searchValue.name : searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                className='searchBig-close'
                onClick={searchLocation}
              />
            </motion.div>

            <div className='flex flex-col items-center'>
              <motion.div variants={searchAnimation.item}>
                <SearchList
                  value={searchValue}
                  setValue={setSearchValue}
                  onLockClic={onLocClick}
                  options={options}
                  setOptions={setOptions}
                />
              </motion.div>

              <motion.div variants={searchAnimation.item}>
                <CloseBtn
                  onClick={closeSearch}
                  className='relative w-11 h-11 rounded-full flex justify-center items-center bg-[#fff] shadow-btnback mt-10 mb-10'
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
