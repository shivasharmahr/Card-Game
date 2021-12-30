import "./styles.css";

const Card = ({ children, id, onClick, error, success }: any) => {
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
