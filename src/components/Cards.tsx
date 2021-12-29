import { useEffect, useReducer } from "react";
import Card from "./Card";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const shuffledArrayfunc = (array: any) => array.sort(() => Math.random() - 0.5);
let shuffledArray = shuffledArrayfunc(array);
let memArray = [-1];
let i = 0;

const Cards = ({ enteredNumber, changeCardStatus, optionValueArray }: any) => {
  // Card click event handler
  const handleClickCard = (e: any) => {
    memArray[i] = e.target.id;
    dispatcherCards({
      type: "UPDATE_CLICKED_NUMBER",
      payload: shuffledArray[e.target.id - 1],
    });
    i++;
  };

  /* createCards function - Returns the all cards inside div.card-holder, 
  
  ** If card is not clicked then it returns cards with numbers hidden.
  ** If card clicked and number matched, 
        * It will truns the card color to green and display the number.
        * It will truns the card color to red and display the number.
  */
  const createCards = (isCorrectNumber = false, clickedCard = false): any => {
    return (
      <div className="card-holder">
        {shuffledArray.map((item: any, index: number) => (
          <Card
            key={item}
            id={index + 1}
            hiddenNum={item}
            memArray={memArray}
            success={
              clickedCard &&
              Number(cards.clickedNumber) === Number(item) &&
              isCorrectNumber
            }
            error={
              clickedCard &&
              Number(cards.clickedNumber) === Number(item) &&
              !isCorrectNumber
            }
            onClick={handleClickCard}
          >
            {clickedCard
              ? Number(cards.clickedNumber) === Number(item)
                ? item
                : "?"
              : "?"}
          </Card>
        ))}
      </div>
    );
  };

  /* 
  trigerExitWindow()
  Number is matchs or 3 attempts are done. Card should not be displayed,
  Exit window should be displayed sending.
  So,(cardValue = false, exitWindowValue = true)
  
  Array is shuffled and kept ready
  */
  const trigerExitWindow = (gameStatus: any) => {
    memArray = [];
    i = 0;
    shuffledArray = shuffledArrayfunc(optionValueArray);
    changeCardStatus(false, true, gameStatus);
  };

  const cardReducer = (state: any, action: any) => {
    switch (action.type) {
      case "UPDATE_CLICKED_NUMBER":
        return { ...state, clickedNumber: action.payload };

      case "UPDATE_ATTEMPTS":
        return { ...state, attempts: action.payload };

      case "CORRECT_NUM_GUESSED":
        return { ...state, cardHolder: action.payload };

      case "WRONG_NUM_GUESSED":
        return { ...state, cardHolder: action.payload };

      default:
        return state;
    }
  };
  const [cards, dispatcherCards] = useReducer(cardReducer, {
    clickedNumber: 0,
    attempts: 1,
    cardHolder: createCards(false, false),
  });

  useEffect(() => {
    if (cards.clickedNumber) {
      if (Number(cards.clickedNumber) === Number(enteredNumber)) {
        {
          dispatcherCards({
            type: "CORRECT_NUM_GUESSED",
            payload: createCards(true, true),
          });
          /* 
            Number is matched. Sending (gameStatus=true)
            So, Exit Window is triggered with .5 sec delay
          */
          setTimeout(() => {
            trigerExitWindow(true);
          }, 500);
        }
      } else {
        let i = cards.attempts + 1;
        dispatcherCards({
          type: "UPDATE_ATTEMPTS",
          payload: i,
        });

        if (cards.attempts === 3) {
          /* 
            Number is not matched in all 3 attempts. 
            So, Exit Window is triggered with .5 sec delay
          */
          setTimeout(() => {
            trigerExitWindow(false);
          }, 500);
        }
        // If number is wrong and still has attempts.
        dispatcherCards({
          type: "WRONG_NUM_GUESSED",
          payload: createCards(false, true),
        });
      }
    }
  }, [cards.clickedNumber]);

  return cards.cardHolder;
};

export default Cards;
