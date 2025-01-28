import Registration from "../components/Registration/Registration";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";
import { useState } from "react";
import Switcher from "../UI/Switcher/Switcher";
import Welcome from "../components/Welcome";
import Button from "../UI/Button/Button";
import { isValidPhoneNumber } from "libphonenumber-js";
import { registration } from "../api/api";

export default function StartPage() {
  const { currentUser, changeCurrentRole, currentRole, setCurrentUser } = useUserStore();
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(false);
  const [toReg, setToReg] = useState(false);
  const [step, setStep] = useState(0);
  const [switcherPos, setSwitcherPos] = useState(-1);
  const navigateToRegister = (value) => {
    if (currentUser && currentUser.name) {
      if (value == "passenger" && !currentUser.passenger_profile) {
        setToReg(true);
        setSwitcherPos((prev) => prev + 1);
      } else if (value == "driver" && !currentUser.driver_profile) {
        setToReg(true);
        setSwitcherPos((prev) => prev + 1);
        setStep(1);
      } else {
        setAuth(true);
        navigate("/main");
      }
    } else {
      setToReg(true);
      setSwitcherPos((prev) => prev + 1);
    }
    changeCurrentRole(value);
  };
  const backFunc = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);

      setSwitcherPos((prev) => prev - 1);
    } else if (step == 0) {
      setToReg(false);

      setSwitcherPos((prev) => prev - 1);
    }
  };

  const nextStep = () => {
    if (step < 1 && currentRole == "passenger") {
      setStep((prev) => prev + 1);
      setSwitcherPos((prev) => prev + 1);
    } else if (step < 2 && currentRole == "driver") {
      setStep((prev) => prev + 1);
      setSwitcherPos((prev) => prev + 1);
    }
    if (currentRole == "passenger" && step == 1) {
      setAuth(true);
      navigate("/main");
    } else if (currentRole == "driver" && step == 2) {
      setAuth(true);
      navigate("/main");
    }
  };

  return (
    <div className='relative min-h-screen flex flex-col items-center '>
      {!toReg ? (
        <Welcome func={navigateToRegister} />
      ) : (
        <>
          <Registration
            backFunc={backFunc}
            step={step}
            nextStep={nextStep}
          />
        </>
      )}
      <Switcher position={switcherPos} />
    </div>
  );
}
