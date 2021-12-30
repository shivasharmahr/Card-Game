import { useState } from "react";
import { optionValueArray } from "../constants";
import Card from "./Card";

const shuffledArrayfunc = (array: any) => array.sort(() => Math.random() - 0.5);
let shuffledArray = shuffledArrayfunc([...optionValueArray]);

const Cards = ({ enteredNumber, changeCardStatus }: any) => {
  const [openedCardsIndices, setOpenedCardsIndices] = useState<any>([]);
  /* 
  trigerExitWindow()
  Number is matchs or 3 attempts are done. Card should not be displayed,
  Exit window should be displayed sending.
  So,(cardValue = false, exitWindowValue = true)
  
  Array is shuffled and kept ready
  */
  const trigerExitWindow = (gameStatus: any) => {
    setTimeout(() => {
      changeCardStatus(false, true, gameStatus);
      shuffledArray = shuffledArrayfunc([...optionValueArray]);
    }, 500);
  };

  return (
    <div className="card-holder">
      {shuffledArray.map((item: any, index: number) => {
        const isIndexIncluded = openedCardsIndices.includes(index.toString());
        const isSuccess = isIndexIncluded && item.toString() === enteredNumber;

        return (
          <Card
            key={item}
            id={index}
            error={isIndexIncluded}
            success={isSuccess}
            onClick={(e: any) => {
              const newIndices: any = [...openedCardsIndices, e.target.id];
              setOpenedCardsIndices(newIndices);
              if (
                newIndices.includes(index.toString()) &&
                item.toString() === enteredNumber
              ) {
                trigerExitWindow(true);
              } else if (newIndices.length > 2) {
                trigerExitWindow(false);
              }
            }}
          >
            {isIndexIncluded ? item : "?"}
          </Card>
        );
      })}
    </div>
  );
};

export default Cards;
