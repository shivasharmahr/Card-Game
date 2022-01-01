import { useRef } from "react";
import Card from "../components/Card";
import { optionValueArray } from "../constants";

const shuffledArrayfunc = (array: any) => array.sort(() => Math.random() - 0.5);

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
  const shuffledArray = shuffledArrayfunc([...optionValueArray]);

  console.log("Rendering card Holder");
  console.log("Shuffled Array", shuffledArray);

  return (
    <div className="card-holder">
      {shuffledArray.map((item: any, index: any) => {
        return (
          <Card
            key={item}
            id={index}
            shuffledArray={shuffledArray}
            enteredNumber={enteredNumber}
            clickedCardIndices={clickedCardIndices}
            shuffledArrayfunc={shuffledArrayfunc}
            changeCardStatus={changeCardStatus}
          ></Card>
        );
      })}
    </div>
  );
};

export default Cards;
