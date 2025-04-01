import "./Input.css";
const Input = ({ type, placeholder, value, onChange, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='input'
      {...props}
    />
  );
};

export default Input;
