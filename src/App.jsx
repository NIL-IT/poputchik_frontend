import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<StartPage />}
        />
        <Route
          path='/register'
          element={<RegistrationPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
