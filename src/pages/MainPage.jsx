import Header from "../UI/Header/Header";
import { useState } from "react";
import DriverList from "../components/DriverList";
import CreateTrip from "../components/CreateTrip";
import MainModals from "../components/MainModals";
import MapComponent from "../components/MapComponent";
import SearchComponent from "../components/SearchComponent";

export default function MainPage() {
  const mock = [
    {
      id: 1,
      name: "Сергей",
      phone: "+7 901 234 56 78",
      avatar: "https://i.pravatar.cc/150?img=1",
      email: "sergey@example.com",
      city: "Москва",
      rating: 4.8,
      comments: ["Отличный водитель!", "Все прошло отлично!", "Рекомендую!"],
    },
    {
      id: 2,
      name: "Василий",
      phone: "+7 902 345 67 89",
      avatar: "https://i.pravatar.cc/150?img=2",
      email: "vasily@example.com",
      city: "Санкт-Петербург",
      rating: 4.6,
      comments: ["Вежливый и пунктуальный.", "Хороший сервис."],
    },
    {
      id: 3,
      name: "Александр",
      phone: "+7 903 456 78 90",
      avatar: "https://i.pravatar.cc/150?img=3",
      email: "alexander@example.com",
      city: "Новосибирск",
      rating: 4.9,
      comments: ["Приятный человек.", "Безопасная и комфортная поездка."],
    },
    {
      id: 4,
      name: "Олег",
      phone: "+7 904 567 89 01",
      avatar: "https://i.pravatar.cc/150?img=4",
      email: "oleg@example.com",
      city: "Екатеринбург",
      rating: 4.5,
      comments: ["Все хорошо, доволен!", "Немного задержался, но в целом ок."],
    },
    {
      id: 5,
      name: "Евгений",
      phone: "+7 905 678 90 12",
      avatar: "https://i.pravatar.cc/150?img=5",
      email: "evgeny@example.com",
      city: "Казань",
      rating: 4.7,
      comments: ["Супер!", "Очень доволен."],
    },
    {
      id: 6,
      name: "Михаил",
      phone: "+7 906 789 01 23",
      avatar: "https://i.pravatar.cc/150?img=6",
      email: "mikhail@example.com",
      city: "Нижний Новгород",
      rating: 4.4,
      comments: ["Профессиональный водитель.", "Хороший сервис."],
    },
    {
      id: 7,
      name: "Дмитрий",
      phone: "+7 907 890 12 34",
      avatar: "https://i.pravatar.cc/150?img=7",
      email: "dmitry@example.com",
      city: "Челябинск",
      rating: 4.2,
      comments: ["Все хорошо, спасибо!", "Могло быть и лучше."],
    },
    {
      id: 8,
      name: "Антон",
      phone: "+7 908 901 23 45",
      avatar: "https://i.pravatar.cc/150?img=8",
      email: "anton@example.com",
      city: "Самара",
      rating: 4.3,
      comments: ["Вовремя приехал, рекомендую.", "Комфортная поездка."],
    },
    {
      id: 9,
      name: "Иван",
      phone: "+7 909 012 34 56",
      avatar: "https://i.pravatar.cc/150?img=9",
      email: "ivan@example.com",
      city: "Омск",
      rating: 4.1,
      comments: ["Средний сервис.", "Есть над чем работать."],
    },
    {
      id: 10,
      name: "Николай",
      phone: "+7 910 123 45 67",
      avatar: "https://i.pravatar.cc/150?img=10",
      email: "nikolay@example.com",
      city: "Ростов-на-Дону",
      rating: 4.0,
      comments: ["В целом хорошо.", "Небольшие недочеты."],
    },
  ];
  const [isCreating, setIsCreating] = useState(false);
  const nerbiest = mock.slice(0, 2);

  function toggleCreating() {
    setIsCreating((prev) => !prev);
  }

  return (
    <div className='bg-black h-screen relative'>
      <Header />
      <SearchComponent />
      <MapComponent />
      <MainModals />
      {isCreating ? (
        <CreateTrip />
      ) : (
        <DriverList
          list={nerbiest}
          toggleCreating={toggleCreating}
          isCreating={isCreating}
        />
      )}
    </div>
  );
}
