import { BrowserRouter as Router, Route, Routes, HashRouter } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/UserPage";
import { useEffect, useState } from "react";
import { useUserStore } from "./state/UserStore";
import { API_KEY } from "./api/api";
import { useUserById } from "./api/user";
import PreviewPage from "./pages/PreviewPage";
import MainModals from "./components/Modals/MainModals";
import { useMap } from "./state/MapRoutesStore";
import HistoryPage from "./pages/HistoryPage";
import ActiveDrivesPage from "./pages/ActiveDrivesPage";
import UserReviews from "./pages/UserReviews";
import PeopleList from "./pages/PeopleList";
import PaymentPage from "./pages/PaymentPage";
import Chat from "./pages/ChatPage";
import ChatList from "./pages/ChatList";

function App() {
  const { setCurrentUser } = useUserStore();
  const { setCenter, center, setCity } = useMap();
  const [userId, setUserId] = useState(null);

  const { data: user } = useUserById(userId);

  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (!tg) return;

    tg.ready();
    tg.expand();
    tg.setHeaderColor("#F6F6F6");
    if (tg.requestViewport) {
      tg.requestViewport({ height: window.innerHeight, width: window.innerWidth });
    }
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
    }

    if (tg.LocationManager.isLocationAvailable) {
      tg.LocationManager.getLocation((data) => {
        if (data) {
          setCenter([data.latitude, data.longitude]);
          return true;
        } else {
          return false;
        }
      });
    } else {
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

  return (
    <div className='container'>
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
            path='/activeDrives'
            element={
              <div className='container-custom'>
                <ProtectedRoute>
                  <ActiveDrivesPage />
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/history'
            element={
              <div className='container-custom'>
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/userReview/:userId'
            element={
              <div className='container-custom'>
                <ProtectedRoute>
                  <UserReviews />
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/peopleList'
            element={
              <div className='container-custom'>
                <ProtectedRoute>
                  <PeopleList />
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/payment'
            element={
              <div className='container-custom'>
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/chat/:tripId/:passengerId'
            element={
              <div className=''>
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/chats'
            element={
              <div className=''>
                <ProtectedRoute>
                  <ChatList />
                </ProtectedRoute>
              </div>
            }
          />
        </Routes>
        <MainModals />
      </Router>
    </div>
  );
}

export default App;
