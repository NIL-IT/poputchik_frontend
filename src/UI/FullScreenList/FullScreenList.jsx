import CloseButton from "../CloseButton";
import "./FullScreenList.css";

export default function FullScreenList({ children, isOpen, toggle }) {
  return (
    <div className={`fullscreen ${isOpen ? "open" : ""}`}>
      <div className='fullscreen-wrapper'>
        <CloseButton onClick={() => toggle()} />
        {children}
      </div>
    </div>
  );
}
