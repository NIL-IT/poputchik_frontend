import "./Button.css";
export default function Button({ children, size, classNames, ...props }) {
  return (
    <button
      {...props}
      className={`btn bg-[#ef7828] ${size} ${classNames}`}>
      {children}
    </button>
  );
}
