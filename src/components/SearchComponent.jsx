import { useState } from "react";
import { useModal } from "../state/ModalStore";
import SearchList from "../UI/SearchList/SearchList";
import CloseBtn from "../UI/CloseBtn";
export default function SearchComponent({ onLocClick }) {
  const { isSearchOpen, toggleSearch } = useModal();
  const [searchValue, setSearchValue] = useState("");

  const closeSearch = () => {
    toggleSearch(false);
    setSearchValue("");
  };
  return (
    <div className={`absolute z-20 h-full w-full bg-white py-8 flex flex-col ${isSearchOpen ? "" : "hidden"} `}>
      <div className='searchBig-container container-custom'>
        <div className='searchBig-wrapper'>
          <label
            htmlFor='searchBig'
            className='searchBig-label'></label>
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
