import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/UserPage";
import { useEffect } from "react";
import { useUserStore } from "./state/UserStore";
import { useUserById } from "./api/api";

function App() {
  const setCurrentUser = useUserStore((state) => state.setCurrentUser);
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
          element={<StartPage />}
        />
        <Route
          path='/registration'
          element={<RegistrationPage />}
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
    </Router>
  );
}

export default App;
