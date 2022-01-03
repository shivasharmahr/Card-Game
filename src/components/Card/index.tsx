import { useState } from "react";
import "./styles.css";

type CardProp = {
  id: any;
  enteredNumber: number;
  shuffledArray: any;
  children?: any;
  clickedCardIndices: any;
  changeCardStatus: any;
};

const Card = ({
  id,
  enteredNumber,
  shuffledArray,
  clickedCardIndices,
  changeCardStatus,
}: CardProp) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [isGuessedRight, setIsGuessedRight] = useState(false);
  const [isGuessedWrong, setIsGuessedWrong] = useState(false);
  const [ClickedNum, setClickedNum] = useState();

  /* 
  trigerExitWindow()
  Number matchs or 3 attempts are done. Card should not be displayed,
  Exit window should be displayed sending.
  So,(cardValue = false, exitWindowValue = true)
  */
  const trigerExitWindow = (gameStatus: boolean) =>
    setTimeout(() => {
      clickedCardIndices.current = 1;
      changeCardStatus(false, true, gameStatus);
    }, 500);

  const onClick = () => {
    setClicked(true);
    setClickedNum(shuffledArray[id]);
    clickedCardIndices.current = clickedCardIndices.current + 1;
    if (shuffledArray[id] === enteredNumber) {
      setIsGuessedRight(true);
      trigerExitWindow(true);
    } else {
      setIsGuessedWrong(true);
    }
  };

  if (isGuessedWrong && clickedCardIndices.current === 4) {
    trigerExitWindow(false);
  }

  return (
    <div
      id={id}
      className={`card${isGuessedWrong ? " card-failed" : ""}${
        isGuessedRight ? " card-success" : ""
      }`}
      onClick={() => onClick()}
    >
      {clicked ? ClickedNum : "?"}
    </div>
  );
};

export default Card;
