/* eslint-disable react/prop-types */
import "./Button.scss";
const Button = ({ text, className, children, ...otherProps }) => {
  return (
    <button
      className={`button p-3 px-lg-5 rounded-pill border-0 ${className}`}
      {...otherProps}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
