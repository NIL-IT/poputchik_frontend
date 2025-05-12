import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/Wrappers/ProtectedRoute";
import UserPage from "./pages/UserPage";
import { useEffect, useState } from "react";
import { useUserStore } from "./state/UserStore";
import { useUserById } from "./api/user";
import PreviewPage from "./pages/PreviewPage";
import MainModals from "./components/Modals/MainModals";
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
import AppInitializer from "./components/AppInitializer";
import Success from "./pages/Success";

function App() {
  const { setCurrentUser } = useUserStore();
  const [userId, setUserId] = useState(null);
  const { user, isFetched } = useUserById(userId);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

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
    if (isFetched) {
      if (user) {
        setCurrentUser(user);
      }
      setIsUserLoaded(true);
    }
  }, [isFetched, user, setCurrentUser]);

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
