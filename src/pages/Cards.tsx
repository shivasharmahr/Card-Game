import { ChangeEvent, useState } from "react";
import { optionValueArray } from "../constants";
import Card from "../components/Card";

const shuffledArrayfunc = (array: any) => array.sort(() => Math.random() - 0.5);
let shuffledArray = shuffledArrayfunc([...optionValueArray]);

type CardsProps = {
  enteredNumber: number;
  changeCardStatus: (
    cardValue: boolean,
    exitWindowValue: boolean,
    gameStatus: boolean
  ) => void;
};

const Cards = ({ enteredNumber, changeCardStatus }: CardsProps) => {
  const [openedCardsIndices, setOpenedCardsIndices] = useState<any>([]);

  /* 
  trigerExitWindow()
  Number is matchs or 3 attempts are done. Card should not be displayed,
  Exit window should be displayed sending.
  So,(cardValue = false, exitWindowValue = true)
  
  Array is shuffled and kept ready
  */

  const hadleOnclick = (e: ChangeEvent<HTMLImageElement>) => {
    if (!openedCardsIndices.includes(e.target.id)) {
      setOpenedCardsIndices([...openedCardsIndices, Number(e.target.id)]);
    }
  };

  const trigerExitWindow = (gameStatus: boolean) =>
    setTimeout(() => {
      changeCardStatus(false, true, gameStatus);
      shuffledArray = shuffledArrayfunc([...optionValueArray]);
    }, 500);

  if (openedCardsIndices.length > 2) {
    trigerExitWindow(false);
  }
  return (
    <div className="card-holder">
      {shuffledArray.map((item: number, index: number) => {
        const isIndexIncluded = openedCardsIndices.includes(index);
        const isSuccess = isIndexIncluded && item === enteredNumber;

        if (isSuccess) {
          trigerExitWindow(true);
        }

        return (
          <Card
            key={item}
            id={index}
            error={isIndexIncluded}
            success={isSuccess}
            onClick={(e: ChangeEvent<HTMLImageElement>) => hadleOnclick(e)}
          >
            {isIndexIncluded ? item : "?"}
          </Card>
        );
      })}
    </div>
  );
};

export default Cards;
