import { useEffect, useState } from "react";
import { API_KEY } from "../../api/api";
import "./SearchList.css";
import { useModal } from "../../state/ModalStore";
import { useTrip } from "../../state/TripStore";
export default function SearchList({ value, setValue }) {
  const { setTripFrom, tripFrom, setTripTo, tripTo } = useTrip();
  const { toggleSearch, setActiveInput, activeInput } = useModal();
  const [options, setOptions] = useState([]);
  const selectALocation = (value) => {
    setValue(value);
    if (activeInput === "from" && value !== tripTo) {
      setTripFrom(value);
    } else if (activeInput === "to" && value !== tripFrom) {
      setTripTo(value);
    }
    setActiveInput("");
    toggleSearch(false);
    setValue("");
  };
  useEffect(() => {
    (async () => {
      try {
        if (value) {
          const res = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${value}&lang=ru_RU&kind=locality`,
          );
          const data = await res.json();
          const collection = data.response.GeoObjectCollection.featureMember
            .filter((item) => item.GeoObject.metaDataProperty.GeocoderMetaData.kind === "locality")
            .map((item) => item.GeoObject);

          setOptions(() => collection);
        } else if (value.length < 1) {
          setOptions([]);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [value]);

  return (
    <div className='searchList-wrapper '>
      {options.map((option) => {
        return (
          <div
            onClick={() => selectALocation(option)}
            key={option.uri}
            className='searchList-item'>
            <span className='searchList-name'>{option.name} </span>
            <span className='searchList-desc'>{option.description}</span>
          </div>
        );
      })}
    </div>
  );
}
