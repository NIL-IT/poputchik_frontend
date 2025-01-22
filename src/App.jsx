import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";

import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/UserPage";
import { useEffect } from "react";
import { useUserStore } from "./state/UserStore";
import { useUserById } from "./api/api";
import MainModals from "./components/MainModals";
import PreviewPage from "./pages/PreviewPage";

function App() {
  const { setCurrentUser } = useUserStore();
  const user = useUserById("4321");
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [setCurrentUser]);

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
