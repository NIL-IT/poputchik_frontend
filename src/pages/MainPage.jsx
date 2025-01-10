import Header from "../UI/Header/Header";
import Footer from "../UI/Footer/Footer";
import Profile from "../UI/Profile/Profile";
import Map from "../components/Map";
import Button from "../UI/Button/Button";
import BottomList from "../components/BottomList";

export default function MainPage() {
  const mock = [{ name: "Сергей" }, { name: "Василий" }, { name: "Александр" }, { name: "Олег" }, { name: "Евгений" }];
  const nerbiest = mock.slice(0, 2);
  return (
    <div className='bg-white h-screen'>
      <Header></Header>
      <Map></Map>
      <BottomList
        list={nerbiest}
        currentRole={"passenger"}
      />
    </div>
  );
}
