import "./App.css";
import Cards from "./components/Cards";
import UserInput from "./pages/UserInput";
import ExitWindow from "./components/ExitWindow";
import { useReducer } from "react";
import { initialState, reducer } from "./store";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const optionValueArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // Call Back handler: When user clicks on play button
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE_CARDS_STATUS",
      payload: true,
    });
    // setCards(true);
    dispatch({
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
      ? dispatch({
          type: "GAME_COMMENT_WIN",
        })
      : dispatch({
          type: "GAME_COMMENT_LOST",
          payload: state.enteredNumber,
        });
    dispatch({
      type: "UPDATE_CARDS_STATUS",
      payload: cardValue,
    });
    // setCards(cardValue);
    dispatch({
      type: "UPDATE_EXIT_WINDOW_STATUS",
      payload: exitWindowValue,
    });
    // setExitWindow(exitWindowValue);
  };

  // To make user input (First Page) to appear on the screen
  const displayUserInput = () => {
    dispatch({
      type: "UPDATE_CARDS_STATUS",
      payload: false,
    });
    dispatch({
      type: "UPDATE_EXIT_WINDOW_STATUS",
      payload: false,
    });
  };

  // When retry button is pressed new shuffled cards has to appear
  const retry = () => {
    dispatch({
      type: "UPDATE_CARDS_STATUS",
      payload: true,
    });
    dispatch({
      type: "UPDATE_EXIT_WINDOW_STATUS",
      payload: false,
    });
  };

  return (
    <>
      {!state.isCards && !state.isExitWindow && (
        <UserInput
          optionValueArray={optionValueArray}
          handleInput={handleSubmit}
        ></UserInput>
      )}
      {state.isCards && (
        <Cards
          optionValueArray={optionValueArray}
          enteredNumber={state.enteredNumber}
          changeCardStatus={changeCardStatus}
        ></Cards>
      )}
      {state.isExitWindow && (
        <ExitWindow
          displayUserInput={displayUserInput}
          retry={retry}
          gameComment={state.gameComment}
        ></ExitWindow>
      )}
    </>
  );
}

export default App;
