import Button from "../UI/Button/Button";
import Footer from "../UI/Footer/Footer";
import Input from "../UI/Input/Input";
import { useModal } from "../state/ModalStore";
import { useTrip } from "../state/TripStore";

export default function CreateTrip() {
  const { tripFrom, tripTo, date, persons, price } = useTrip();
  const { toggleCalendar, togglePersonModal, togglePrice, toggleSearch, setActiveInput } = useModal();

  function openSearch(value) {
    toggleSearch(true);
    setActiveInput(value);
  }

  return (
    <Footer className={`bg-[#F6F6F6] px-5`}>
      <h2 className='text-left font-bold text-[20px] leading-5 mb-6 '>Создайте поездку</h2>
      <form className='rounded-[15px] create'>
        <div className='first geo'>
          <Input
            readOnly
            placeholder={"откуда"}
            value={tripFrom}
            onChange={() => {}}
            onClick={() => openSearch("1")}
          />
        </div>
        <div className='geo'>
          <Input
            readOnly
            placeholder={"куда"}
            value={tripTo}
            onChange={() => {}}
            onClick={() => openSearch("2")}
          />
        </div>
        <div className='date'>
          <Input
            readOnly
            onClick={() => toggleCalendar(true)}
            value={date}
            onChange={() => {}}
            type={"text"}
            placeholder={"00.00.00"}
          />
        </div>
        <div className='person'>
          <Input
            readOnly
            onChange={() => {}}
            onClick={() => togglePersonModal(true)}
            type={"number"}
            value={Number(persons)}
          />
        </div>
        <div className='price'>
          <Input
            readOnly
            onClick={() => togglePrice(true)}
            type={"number"}
            onChange={() => {}}
            value={price}
          />
        </div>
        <Button
          size={"large"}
          classNames={"btn-form"}>
          Сохранить
        </Button>
      </form>
    </Footer>
  );
}
