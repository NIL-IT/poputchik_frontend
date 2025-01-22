import { useModal } from "../../state/ModalStore";
import BackButton from "../BackButton";
import CloseBtn from "../CloseBtn";
import "./FullScreenList.css";

export default function FullScreenList({ children, isOpen, toggle, isCreating, isNumbers, isClose }) {
  return (
    <div className={`fullscreen ${isOpen ? "open" : ""} ${isCreating ? "calendar" : ""} ${isNumbers ? "numbers" : ""}`}>
      <div className='fullscreen-wrapper container-custom'>
        {isClose ? <CloseBtn onClick={() => toggle()} /> : <BackButton onClick={() => toggle()} />}

        {children}
      </div>
    </div>
  );
}
