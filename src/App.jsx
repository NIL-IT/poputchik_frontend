import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserPage from "./pages/UserPage";

function App() {
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
