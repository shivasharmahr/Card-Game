import "./styles.css";
import { ReactChild } from "react";

type CardProp = {
  children: ReactChild;
  id: any;
  onClick: any;
  error: boolean;
  success: boolean;
};
const Card = ({ children, id, onClick, error, success }: CardProp) => {
  return (
    <div
      id={id}
      className={`card${error ? " card-failed" : ""}${
        success ? " card-success" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
