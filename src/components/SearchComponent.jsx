import React from "react";
import { useModal } from "../state/ModalStore";
import SearchList from "../UI/SearchList/SearchList";

export default function SearchComponent() {
  const { isSearchOpen, toggleSearch } = useModal();
  return (
    <div className={`absolute z-20 h-full w-full bg-white py-8 ${isSearchOpen ? "" : "hidden"}`}>
      <div className='searchBig-container'>
        <label
          htmlFor='searchBig'
          className='searchBig-label'></label>
        <input
          className='searchBig-input'
          id='searchBig'
          type='text'
        />
        <button
          className='searchBig-close'
          onClick={() => toggleSearch(false)}></button>
      </div>
      <SearchList />
    </div>
  );
}
