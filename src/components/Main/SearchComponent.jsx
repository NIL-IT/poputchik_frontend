import { useEffect, useState } from "react";
import { useModal } from "../../state/ModalStore";
import SearchList from "../../UI/SearchList/SearchList";
import CloseBtn from "../../UI/CloseBtn";
import { useMap } from "../../state/MapRoutesStore";
import { API_KEY } from "../../api/api";
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
            return ["locality", "street", "house"].includes(kind) && item.GeoObject.description.includes("Алтай");
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
    <div
      className={`pt-[60px] absolute z-20 h-full w-full bg-white py-8 flex flex-col ${isSearchOpen ? "" : "hidden"} `}>
      <div className='searchBig-container container-custom'>
        <div className='searchBig-wrapper'>
          <label
            htmlFor='searchBig'
            className='searchBig-label'
            onClick={searchLocation}></label>
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
            onClick={() => setSearchValue("")}></button>
        </div>
        <div className='flex flex-col items-center'>
          <SearchList
            value={searchValue}
            setValue={setSearchValue}
            onLockClic={onLocClick}
            options={options}
            setOptions={setOptions}
          />
          <CloseBtn
            onClick={closeSearch}
            className='relative  w-11 h-11 rounded-full flex justify-center items-center bg-[#fff] shadow-btnback mt-10 mb-10'
          />
        </div>
      </div>
    </div>
  );
}
