import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import RegistrationPage from "./pages/RegistrationPage";
import MainPage from "./pages/MainPage";
import { useState } from "react";
import UserPage from "./pages/UserPage";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Антон Татарченко",
    phone: "+132131231",
    avatar: "https://i.pravatar.cc/150?img=4",
    email: "xd@mail.ru",
    city: "Новосибирск",
  });
  const [role, setRole] = useState("");
  function chooseRole(value) {
    setRole(value);
  }
  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<StartPage setRole={chooseRole} />}
        />
        <Route
          path='/registration'
          element={
            <RegistrationPage
              role={role}
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
