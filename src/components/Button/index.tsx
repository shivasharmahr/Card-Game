import { ReactChild } from "react";
import "./styles.css";
type ButtonProp = {
  children: ReactChild;
  value?: string;
  onClick?: any;
};
const Button = ({ children, onClick, ...otherProps }: ButtonProp) => {
  return (
    <button onClick={onClick} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
