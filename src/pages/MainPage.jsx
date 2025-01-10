import Header from "../UI/Header/Header";
import Profile from "../UI/Profile/Profile";
import Map from "../components/Map";
import BottomList from "../components/BottomList";
import { useState } from "react";
import FullScreenList from "../UI/FullScreenList/FullScreenList";

export default function MainPage() {
  const mock = [
    { id: 1, name: "Сергей", city: "Москва", rating: 4.8, avatar: "https://i.pravatar.cc/150?img=1", comments: 12 },
    {
      id: 2,
      name: "Василий",
      city: "Санкт-Петербург",
      rating: 4.6,
      avatar: "https://i.pravatar.cc/150?img=2",
      comments: 8,
    },
    {
      id: 3,
      name: "Александр",
      city: "Новосибирск",
      rating: 4.9,
      avatar: "https://i.pravatar.cc/150?img=3",
      comments: 15,
    },
    { id: 4, name: "Олег", city: "Екатеринбург", rating: 4.5, avatar: "https://i.pravatar.cc/150?img=4", comments: 10 },
    { id: 5, name: "Евгений", city: "Казань", rating: 4.7, avatar: "https://i.pravatar.cc/150?img=5", comments: 9 },
    {
      id: 6,
      name: "Михаил",
      city: "Нижний Новгород",
      rating: 4.4,
      avatar: "https://i.pravatar.cc/150?img=6",
      comments: 7,
    },
    { id: 7, name: "Дмитрий", city: "Челябинск", rating: 4.2, avatar: "https://i.pravatar.cc/150?img=7", comments: 14 },
    { id: 8, name: "Антон", city: "Самара", rating: 4.3, avatar: "https://i.pravatar.cc/150?img=18", comments: 5 },
    { id: 9, name: "Иван", city: "Омск", rating: 4.1, avatar: "https://i.pravatar.cc/150?img=9", comments: 11 },
    {
      id: 10,
      name: "Николай",
      city: "Ростов-на-Дону",
      rating: 4.0,
      avatar: "https://i.pravatar.cc/150?img=10",
      comments: 6,
    },
    { id: 11, name: "Андрей", city: "Уфа", rating: 4.8, avatar: "https://i.pravatar.cc/150?img=11", comments: 18 },
    {
      id: 12,
      name: "Павел",
      city: "Красноярск",
      rating: 4.6,
      avatar: "https://i.pravatar.cc/150?img=12",
      comments: 13,
    },
    {
      id: 13,
      name: "Константин",
      city: "Пермь",
      rating: 4.9,
      avatar: "https://i.pravatar.cc/150?img=13",
      comments: 19,
    },
    {
      id: 14,
      name: "Владимир",
      city: "Волгоград",
      rating: 4.5,
      avatar: "https://i.pravatar.cc/150?img=14",
      comments: 17,
    },
    { id: 15, name: "Артур", city: "Воронеж", rating: 4.7, avatar: "https://i.pravatar.cc/150?img=15", comments: 10 },
    { id: 16, name: "Руслан", city: "Саратов", rating: 4.3, avatar: "https://i.pravatar.cc/150?img=16", comments: 8 },
    {
      id: 17,
      name: "Максим",
      city: "Краснодар",
      rating: 4.4,
      avatar: "https://i.pravatar.cc/150?img=17",
      comments: 12,
    },
    { id: 18, name: "Юрий", city: "Тюмень", rating: 4.6, avatar: "https://i.pravatar.cc/150?img=18", comments: 9 },
    { id: 19, name: "Алексей", city: "Ижевск", rating: 4.2, avatar: "https://i.pravatar.cc/150?img=19", comments: 7 },
    { id: 20, name: "Виктор", city: "Барнаул", rating: 4.1, avatar: "https://i.pravatar.cc/150?img=20", comments: 11 },
  ];

  const nerbiest = mock.slice(0, 2);
  const [isFullScreen, setIsFullScreen] = useState(false);
  function toggleFullScreen() {
    setIsFullScreen((prev) => !prev);
  }
  return (
    <div className='bg-black h-screen relative'>
      <Header></Header>
      <Map></Map>
      <FullScreenList
        isOpen={isFullScreen}
        toggle={toggleFullScreen}>
        <h3 className='font-bold text-[20px] leading-5 pb-8'>Список водителей</h3>
        <div className='flex flex-col gap-4'>
          {mock.map((obj) => {
            return (
              <Profile
                key={obj.id}
                avatar={obj.avatar}
                name={obj.name}
                rating={obj.rating}
                comments={obj.comments}
              />
            );
          })}
        </div>
      </FullScreenList>
      <BottomList
        list={nerbiest}
        currentRole={"passenger"}
        toggle={toggleFullScreen}
      />
    </div>
  );
}
