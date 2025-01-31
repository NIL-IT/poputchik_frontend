import { useEffect } from "react";
import "./CustomHeader.css";

const CustomHeader = () => {
  useEffect(() => {
    const tg = window.Telegram.WebApp;
    if (tg) {
      tg.expand();
    }
  }, []);

  return (
    <div className='custom-header'>
      <button
        className='back-button'
        onClick={() => window.Telegram.WebApp.close()}>
        ←
      </button>
      <span className='title'>SpaceT</span>
      <button
        className='menu-button'
        onClick={() => alert("Открыть меню")}>
        ⋮
      </button>
    </div>
  );
};

export default CustomHeader;
