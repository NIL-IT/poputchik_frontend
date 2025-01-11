import BackButton from "../BackButton";
import "./FullScreenList.css";

export default function FullScreenList({ children, isOpen, toggle }) {
  return (
    <div className={`fullscreen ${isOpen ? "open" : ""}`}>
      <div className='fullscreen-wrapper'>
        <BackButton onClick={() => toggle()} />
        {children}
      </div>
    </div>
  );
}
