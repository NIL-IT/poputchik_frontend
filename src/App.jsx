import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/Wrappers/ProtectedRoute";
import UserPage from "./pages/UserPage";
import { useEffect, useRef, useState } from "react";
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
import AnimatedRoute from "./components/Wrappers/AnimatedRoute";
import { pageSlideLeft, slideDownIn, slideUpIn } from "./utils/animation";
import Privacy from "./pages/Privacy";
import Info from "./pages/Info";
import { getStatus } from "./api/payment";
import AppInitializer from "./components/AppInitializer";
import Success from "./pages/Success";
import { initializeGeo } from "./utils/geoInit";

function App() {
  const { setCurrentUser } = useUserStore();
  const { setPosition, positon, setCity } = useMap();
  const [userId, setUserId] = useState(null);
  const { user, isFetched } = useUserById(userId);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (!tg) return;
    getStatus();
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
    if (isFetched) {
      if (user) {
        setCurrentUser(user);
      }
      setIsUserLoaded(true);
    }
  }, [isFetched, user, setCurrentUser]);

  const initLocationRef = useRef(false);

  useEffect(() => {
    if (initLocationRef.current) return;
    initLocationRef.current = true;

    const tg = window.Telegram.WebApp;
    if (!tg?.LocationManager) {
      console.error("Telegram WebApp LocationManager недоступен");
      return;
    }

    let intervalId;

    initializeGeo(setPosition);

    return () => {
      clearInterval(intervalId);
    };
  }, [setPosition]);

  useEffect(() => {
    if (positon && positon.length === 2) {
      // getCityByCoordinates();
    }
  }, [positon]);

  const getCityByCoordinates = async () => {
    try {
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&geocode=${positon[1]},${positon[0]}&format=json`,
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
      <AppInitializer />
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <AnimatedRoute>
                <StartPage isUserLoaded={isUserLoaded} />
              </AnimatedRoute>
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
                <AnimatedRoute variants={slideDownIn}>
                  <MainPage />
                </AnimatedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='/user'
            element={
              <ProtectedRoute>
                <AnimatedRoute
                  key='user-page'
                  variants={pageSlideLeft}
                  className='w-full h-full overflow-hidden'>
                  <UserPage />
                </AnimatedRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path='/activeDrives'
            element={
              <div className='container-custom'>
                <ProtectedRoute>
                  <AnimatedRoute variants={slideUpIn}>
                    <ActiveDrivesPage />
                  </AnimatedRoute>
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/history'
            element={
              <div className='container-custom'>
                <ProtectedRoute>
                  <AnimatedRoute variants={pageSlideLeft}>
                    <HistoryPage />
                  </AnimatedRoute>
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/userReview/:userId'
            element={
              <div className='container-custom'>
                <ProtectedRoute>
                  <AnimatedRoute variants={slideUpIn}>
                    <UserReviews />
                  </AnimatedRoute>
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/peopleList'
            element={
              <div className='container-custom'>
                <ProtectedRoute>
                  <AnimatedRoute variants={slideUpIn}>
                    <PeopleList />
                  </AnimatedRoute>
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
            path='/payment/success'
            element={
              <div className='container-custom'>
                <Success />
              </div>
            }
          />
          <Route
            path='/chat/:tripId/:passengerId'
            element={
              <div className=''>
                <ProtectedRoute>
                  <AnimatedRoute variants={slideUpIn}>
                    <Chat />
                  </AnimatedRoute>
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/chats'
            element={
              <div className=''>
                <ProtectedRoute>
                  <AnimatedRoute variants={slideDownIn}>
                    <ChatList />
                  </AnimatedRoute>
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path='/privacy'
            element={
              <div className='custom-container'>
                <AnimatedRoute variants={slideDownIn}>
                  <Privacy />
                </AnimatedRoute>
              </div>
            }
          />
          <Route
            path='/info'
            element={
              <div className='custom-container'>
                <AnimatedRoute variants={slideDownIn}>
                  <Info />
                </AnimatedRoute>
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
