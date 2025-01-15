import { useModal } from "../../state/ModalStore";
import BackButton from "../BackButton";
import CloseBtn from "../CloseBtn";
import "./FullScreenList.css";

export default function FullScreenList({ children, isOpen, toggle, isCreating, isNumbers }) {
  return (
    <div className={`fullscreen ${isOpen ? "open" : ""} ${isCreating ? "calendar" : ""} ${isNumbers ? "numbers" : ""}`}>
      <div className='fullscreen-wrapper container-custom'>
        {isCreating ? (
          <CloseBtn onClick={() => toggle()} />
        ) : (
          <BackButton
            isCalendar
            onClick={() => toggle()}
          />
        )}

        {children}
      </div>
    </div>
  );
}
