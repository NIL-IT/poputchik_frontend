import "./Burger.css";
export default function Burger({ onClick }) {
  return (
    <button
      className='hamburger-menu'
      onClick={onClick}>
      <div className='bar'></div>
      <div className='bar'></div>
      <div className='bar'></div>
    </button>
  );
}
