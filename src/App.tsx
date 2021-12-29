import "./App.css";
import Cards from "./components/Cards";
import UserInput from "./components/UserInput";
import ExitWindow from "./components/ExitWindow";
import { useReducer } from "react";

function App() {
  console.log("App is rendering");
  const cardGameReducer = (state: any, action: any) => {
    switch (action.type) {
      case "INIT_ENTERED_NUM":
        return { ...state, enteredNumber: action.payload };
      case "UPDATE_CARDS_STATUS":
        return { ...state, isCards: action.payload };
      case "UPDATE_EXIT_WINDOW_STATUS":
        return { ...state, isExitWindow: action.payload };
      case "GAME_COMMENT_WIN":
        return { ...state, gameComment: "Congrats, You guessed the right " };
      case "GAME_COMMENT_LOST":
        return {
          ...state,
          gameComment: `You lost the game, you can "Retry" with the same input ${action.payload} or choose another number by pressing "Exit"`,
        };
    }
  };

  const [cardGame, dispatcherCardGame] = useReducer(cardGameReducer, {
    enteredNumber: 0,
    isCards: false,
    isExitWindow: false,git
    gameComment: "",
  });

  const optionValueArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Call Back handler: When user clicks on play button
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatcherCardGame({
      type: "UPDATE_CARDS_STATUS",
      payload: true,
    });
    // setCards(true);
    dispatcherCardGame({
      type: "INIT_ENTERED_NUM",
      payload: e.target[1].value,
    });
    // setEnteredNumber(e.target[1].value);
  };

  // To make cards appearance on the screen
  const changeCardStatus = (
    cardValue: any,
    exitWindowValue: any,
    gameStatus: any
  ) => {
    gameStatus
      ? dispatcherCardGame({
          type: "GAME_COMMENT_WIN",
        })
      : dispatcherCardGame({
          type: "GAME_COMMENT_LOST",
          payload: cardGame.enteredNumber,
        });
    dispatcherCardGame({
      type: "UPDATE_CARDS_STATUS",
      payload: cardValue,
    });
    // setCards(cardValue);
    dispatcherCardGame({
      type: "UPDATE_EXIT_WINDOW_STATUS",
      payload: exitWindowValue,
    });
    // setExitWindow(exitWindowValue);
  };

  // To make user input (First Page) to appear on the screen
  const displayUserInput = () => {
    dispatcherCardGame({
      type: "UPDATE_CARDS_STATUS",
      payload: false,
    });
    dispatcherCardGame({
      type: "UPDATE_EXIT_WINDOW_STATUS",
      payload: false,
    });
  };

  // When retry button is pressed new shuffled cards has to appear
  const retry = () => {
    dispatcherCardGame({
      type: "UPDATE_CARDS_STATUS",
      payload: true,
    });
    dispatcherCardGame({
      type: "UPDATE_EXIT_WINDOW_STATUS",
      payload: false,
    });
  };

  return (
    <>
      {!cardGame.isCards && !cardGame.isExitWindow && (
        <UserInput
          optionValueArray={optionValueArray}
          handleInput={handleSubmit}
        ></UserInput>
      )}
      {cardGame.isCards && (
        <Cards
          optionValueArray={optionValueArray}
          enteredNumber={cardGame.enteredNumber}
          changeCardStatus={changeCardStatus}
        ></Cards>
      )}
      {cardGame.isExitWindow && (
        <ExitWindow
          displayUserInput={displayUserInput}
          retry={retry}
          gameComment={cardGame.gameComment}
        ></ExitWindow>
      )}
    </>
  );
}

export default App;
