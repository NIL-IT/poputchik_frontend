import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/UserPage";
import { useEffect, useState } from "react";
import { useUserStore } from "./state/UserStore";
import { API_KEY, useUserById } from "./api/api";
import PreviewPage from "./pages/PreviewPage";
import MainModals from "./components/Modals/MainModals";
import { useMap } from "./state/MapRoutesStore";

function App() {
  const { setCurrentUser } = useUserStore();
  const { setCenter, center, setCity } = useMap();
  const user = useUserById("1");
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("currentUser");
  //   if (storedUser) {
  //     setCurrentUser(JSON.parse(storedUser));
  //   }
  // }, [setCurrentUser]);

  // useEffect(() => {
  //   const tg = window.Telegram.WebApp;
  //   tg.ready(); // Оповещает Telegram о готовности Web App
  //   tg.expand();
  //   // console.log(tg);
  // }, []);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const requestLocation = () => {
    const tg = window.Telegram.WebApp;

    if (tg.LocationManager && !tg.LocationManager.isInited) {
      tg.LocationManager.init(() => {
        console.log("LocationManager initialized");
      });
    }

    if (tg.LocationManager.isLocationAvailable) {
      tg.LocationManager.getLocation((data) => {
        if (data) {
          setLocation({
            latitude: data.latitude,
            longitude: data.longitude,
          });
          setCenter([data.latitude, data.longitude]);
          console.log("Location received:", data);
        } else {
          // Ошибка получения местоположения
          console.log("first");
        }
      });
    } else {
      console.log("second");
    }
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       setCenter([position.coords.latitude, position.coords.longitude]);
    //       console.log(center);
    //     },
    //     (error) => {
    //       console.error("Ошибка получения геолокации:", error.message);
    //     },
    //   );
    // } else {
    //   console.error("Геолокация не поддерживается вашим браузером.");
    // }
  };

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
          console.log(cityName);
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

  useEffect(() => {
    const fetchData = async () => {
      await requestLocation();
      await getCityByCoordinates();
    };

    fetchData();
  }, []);
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
      </Routes>
      <MainModals />
    </Router>
  );
}

export default App;
