import { useRef } from "react";
import Card from "../components/Card";
import { optionValueArray } from "../constants";

const shuffledArrayfunc = (array: any) => {
  return array.sort(() => Math.random() - 0.5);
};
const shuffledArray = shuffledArrayfunc([...optionValueArray]);
type CardsProps = {
  enteredNumber: number;
  changeCardStatus: (
    cardValue: boolean,
    exitWindowValue: boolean,
    gameStatus: boolean
  ) => void;
};

const Cards = ({ enteredNumber, changeCardStatus }: CardsProps) => {
  const clickedCardIndices = useRef(1);

  return (
    <div className="card-holder">
      {shuffledArray.map((item: any, index: any) => {
        return (
          <Card
            key={index}
            id={index}
            shuffledArray={shuffledArray}
            enteredNumber={enteredNumber}
            clickedCardIndices={clickedCardIndices}
            changeCardStatus={changeCardStatus}
          ></Card>
        );
      })}
    </div>
  );
};

export default Cards;
