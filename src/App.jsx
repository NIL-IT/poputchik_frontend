import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";

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
          element={<MainPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
