import Registration from "../components/Registration";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../state/UserStore";
import { useState } from "react";
import Switcher from "../UI/Switcher/Switcher";
import Welcome from "../components/Welcome";
import Button from "../UI/Button/Button";

export default function StartPage() {
  const { currentUser, changeCurrentRole, currentRole } = useUserStore();
  const navigate = useNavigate();
  const [isAuth, setAuth] = useState(false);
  const [toReg, setToReg] = useState(false);
  const [step, setStep] = useState(0);
  const [switcherPos, setSwitcherPos] = useState(-1);
  const navigateToRegister = (value) => {
    if (currentUser && currentUser.name) {
      // navigate("/registration");
      setAuth(true);
      navigate("/main");
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
    if (step < 2) {
      setStep((prev) => prev + 1);
      setSwitcherPos((prev) => prev + 1);
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
          />
          <Button
            type='submit'
            classNames='absolute bottom-10'
            size={"large"}
            onClick={() => nextStep()}>
            Сохранить
          </Button>
        </>
      )}
      <Switcher position={switcherPos} />
    </div>
  );
}
