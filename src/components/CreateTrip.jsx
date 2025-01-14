import Button from "../UI/Button/Button";
import Footer from "../UI/Footer/Footer";
import Input from "../UI/Input/Input";

export default function CreateTrip() {
  return (
    <Footer className={`bg-[#F6F6F6] px-5`}>
      <h2 className=''>Создайте поездку</h2>
      <form className=''>
        <div className=''>
          <Input />
        </div>
        <div className=''>
          <Input />
        </div>
        <div className=''>
          <Input />
        </div>
        <div className=''>
          <Input />
        </div>
        <Button size={"large"}>Сохранить</Button>
      </form>
    </Footer>
  );
}
