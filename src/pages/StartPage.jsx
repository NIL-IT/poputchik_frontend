import Registration from "../components/Registration/Registration";
import {  useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";
import { useState } from "react";
import Welcome from "../components/Welcome";
import { useRegistrationStore } from "../state/useRegistration";

export default function StartPage({ isUserLoaded }) {
  const { currentUser, changeCurrentRole, currentRole } = useUserStore();
  const isDriver = currentRole === "driver";
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(false);
  const {toReg, setField} = useRegistrationStore(); 
  const [step, setStep] = useState(0);
  const [switcherPos, setSwitcherPos] = useState(-1);
  const navigateToRegister = (value) => {
    if (currentUser && currentUser.name) {
      if (value == "passenger" && !currentUser.passenger_profile) {
        setField('toReg', true);
        setSwitcherPos((prev) => prev + 1);
      } else if (value == "driver" && !currentUser.driver_profile) {
        setField('toReg', true);
        setSwitcherPos((prev) => prev + 1);
        setStep(1);
      } else {
        setAuth(true);
        navigate("/main");
      }
    } else {
      setField('toReg', true);
      setSwitcherPos((prev) => prev + 1);
    }
    changeCurrentRole(value);
  };
  const backFunc = () => {
    if (step === 0 && !currentUser.driver_profile && currentRole === "driver") {
      setField('toReg', false);
      setSwitcherPos(-1);
    }

    if (step > 0) {
      setStep((prev) => prev - 1);

      setSwitcherPos((prev) => prev - 1);
    } else if (step == 0) {
      setField('toReg', false);

      setSwitcherPos((prev) => prev - 1);
    }
  };
  const nextStep = () => {
    if (step < 1 && currentRole == "passenger") {
      setStep((prev) => prev + 1);
      setSwitcherPos((prev) => prev + 1);
    } else if (step < 2 && isDriver) {
      setStep((prev) => prev + 1);
      setSwitcherPos((prev) => prev + 1);
    }
    if (currentRole == "passenger" && step == 1) {
      setAuth(true);
      navigate("/main");
    } else if (isDriver && step == 2) {
      setAuth(true);
      navigate("/main");
    }
  };

  return (
    <div className='relative min-h-screen flex flex-col items-center '>
      {!toReg ? (
        <Welcome
          isUserLoaded={isUserLoaded}
          func={navigateToRegister}
          step={switcherPos}
        />
      ) : (
        <>
          <Registration
            backFunc={backFunc}
            step={step}
            nextStep={nextStep}
          />
        </>
      )}
    </div>
  );
}
