import "./SearchList.css";
import { useModal } from "../../../../state/ModalStore";
import { useTrip } from "../../../../state/TripStore";
import { useMap } from "../../../../state/MapRoutesStore";
export default function SearchList({ setValue, options, setOptions }) {
  const { setTripFrom, tripFrom, setTripTo, tripTo } = useTrip();
  const { toggleSearch, setActiveInput, activeInput } = useModal();
  const { setCenter } = useMap();
  const selectALocation = (value) => {
    setValue(value);
    if (activeInput === "from" && value !== tripTo) {
      setTripFrom({
        name: value.metaDataProperty.GeocoderMetaData.text,
        coordinates: {
          latitude: Number(value.Point.pos.split(" ")[1]),
          longitude: Number(value.Point.pos.split(" ")[0]),
        },
      });
    } else if (activeInput === "to" && value !== tripFrom) {
      setTripTo({
        name: value.metaDataProperty.GeocoderMetaData.text,
        coordinates: {
          latitude: Number(value.Point.pos.split(" ")[1]),
          longitude: Number(value.Point.pos.split(" ")[0]),
        },
      });
    } else {
      setCenter([Number(value.Point.pos.split(" ")[1]), Number(value.Point.pos.split(" ")[0])]);
    }
    setActiveInput("");
    toggleSearch(false);
    setValue("");
    setOptions([]);
  };
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
