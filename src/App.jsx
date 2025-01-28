import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/UserPage";
import { useEffect, useState } from "react";
import { useUserStore } from "./state/UserStore";
import { API_KEY, getUserById, useUserById } from "./api/api";
import PreviewPage from "./pages/PreviewPage";
import MainModals from "./components/Modals/MainModals";
import { useMap } from "./state/MapRoutesStore";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const { setCurrentUser, currentUser } = useUserStore();
  const { setCenter, center, setCity } = useMap();
  const [userId, setUserId] = useState(null);
  const { data: user } = useUserById(userId);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (!tg) return;

    tg.ready();
    tg.expand();

    const userData = tg.initDataUnsafe?.user;
    if (userData?.id) {
      setUserId(userData.id);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user, setCurrentUser]);

  const requestLocation = async () => {
    const tg = window.Telegram.WebApp;

    if (!tg || !tg.LocationManager) {
      console.error("Telegram WebApp или LocationManager недоступен");
      return false;
    }

    if (!tg.LocationManager.isInited) {
      await new Promise((resolve) => tg.LocationManager.init(resolve));
      console.log("LocationManager инициализирован");
    }

    if (tg.LocationManager.isLocationAvailable) {
      tg.LocationManager.getLocation((data) => {
        if (data) {
          setCenter([data.latitude, data.longitude]);
          console.log(data);
          console.log("Location получен:", data);
          return true;
        } else {
          console.error("Не удалось получить геолокацию");
          return false;
        }
      });
    } else {
      console.warn("Геолокация недоступна через Telegram");
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const success = await requestLocation();
      if (success) {
        await getCityByCoordinates();
      }
    };

    fetchData();
  }, []);

  const getCityByCoordinates = async () => {
    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${center[1]},${center[0]}&format=json`,
      );
      const data = await response.json();

      const geoObject = data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
      if (geoObject) {
        const cityName = geoObject.metaDataProperty.GeocoderMetaData.Address.Components.find(
          (component) => component.kind === "locality",
        )?.name;

        if (cityName) {
          setCity(cityName);
        } else {
          console.log("Не удалось найти название города");
        }
      } else {
        console.log("Не удалось получить данные от геокодера");
      }
    } catch (err) {
      console.log("Ошибка при запросе: " + err);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await requestLocation();
  //     await getCityByCoordinates();
  //   };

  //   fetchData();
  // }, []);
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <div className='container-custom'>
              <StartPage />
            </div>
          }
        />
        <Route
          path='/preview'
          element={
            <div className='container-custom'>
              <PreviewPage />
            </div>
          }
        />
        <Route
          path='/main'
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/user'
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={
            <div className='container-custom'>
              <HistoryPage />
            </div>
          }
        />
      </Routes>
      <MainModals />
    </Router>
  );
}

export default App;
