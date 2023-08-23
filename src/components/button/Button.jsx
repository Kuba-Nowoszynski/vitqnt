import "./Button.scss";
const Button = ({ text, className }) => {
  return (
    <button className={`button p-3 px-lg-5 rounded-pill border-0 ${className}`}>
      {text}
    </button>
  );
};

export default Button;
