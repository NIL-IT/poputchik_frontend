import "./Button.css";
export default function Button({ children, size, classNames, ...props }) {
  return (
    <button
      {...props}
      className={`btn ${size} ${classNames}`}>
      {children}
    </button>
  );
}
