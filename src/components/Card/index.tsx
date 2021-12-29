import "./styles.css";

const Card = ({
  children,
  id,
  onClick,
  error,
  success,
  memArray,
  hiddenNum,
}: any) => {
  let previousError = false;
  if (memArray[0] !== -1) {
    memArray.map((item: number) => {
      if (Number(item) === Number(id)) {
        previousError = true;
      }
    });
  }

  return (
    <div
      id={id}
      className={`card ${error || previousError ? "card-failed" : ""} ${
        success ? "card-success" : ""
      }`}
      onClick={onClick}
    >
      {previousError ? hiddenNum : children}
    </div>
  );
};

export default Card;
