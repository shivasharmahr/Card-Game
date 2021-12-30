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
  console.log(openedCardsIndices);
  /* 
  trigerExitWindow()
  Number is matchs or 3 attempts are done. Card should not be displayed,
  Exit window should be displayed sending.
  So,(cardValue = false, exitWindowValue = true)
  
  Array is shuffled and kept ready
  */
  const trigerExitWindow = (gameStatus: boolean) => {
    setTimeout(() => {
      changeCardStatus(false, true, gameStatus);
      shuffledArray = shuffledArrayfunc([...optionValueArray]);
    }, 500);
  };

  return (
    <div className="card-holder">
      {shuffledArray.map((item: number, index: number) => {
        const isIndexIncluded = openedCardsIndices.includes(index.toString());
        const isSuccess = isIndexIncluded && item === enteredNumber;

        const hadleOnclick = (e: ChangeEvent<HTMLImageElement>) => {
          let newIndices: any = [...openedCardsIndices];
          if (!newIndices.includes(e.target.id)) {
            newIndices = [...openedCardsIndices, e.target.id];
            setOpenedCardsIndices(newIndices);
            console.log("open", openedCardsIndices);
            console.log("open", openedCardsIndices);
          }

          if (newIndices.includes(index.toString()) && item === enteredNumber) {
            trigerExitWindow(true);
          } else if (newIndices.length > 2) {
            trigerExitWindow(false);
          }
        };

        return (
          <Card
            key={item}
            id={index}
            error={isIndexIncluded}
            success={isSuccess}
            onClick={hadleOnclick}
          >
            {isIndexIncluded ? item : "?"}
          </Card>
        );
      })}
    </div>
  );
};

export default Cards;
