import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import { useState } from "react";
import UserPage from "./pages/UserPage";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Антон Татарченко",
    phone: "+79635120103",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "tatarchenko.04@mail.ru",
    city: "Новосибирск",
  });
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<StartPage />}
        />
        <Route
          path='/registration'
          element={
            <RegistrationPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path='/main'
          element={
            <MainPage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path='/user'
          element={
            <UserPage
              currentUser={currentUser}
              // setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
