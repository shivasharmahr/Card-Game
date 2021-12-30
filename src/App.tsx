import { useReducer } from "react";
import "./App.css";
import Cards from "./pages/Cards";
import ExitWindow from "./pages/ExitWindow";
import UserInput from "./pages/UserInput";
import { initialState, reducer } from "./store";

function App() {
  const cardGameReducer = reducer;

  const [cardGame, dispatcherCardGame] = useReducer(
    cardGameReducer,
    initialState
  );

  // Call Back handler: When user clicks on play button
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatcherCardGame({
      type: "UPDATE_CARDS_STATUS",
      payload: true,
    });
    dispatcherCardGame({
      type: "INIT_ENTERED_NUM",
      payload: Number(e.target[1].value),
    });
  };

  // To make cards appearance on the screen
  const changeCardStatus = (
    cardValue: boolean,
    exitWindowValue: boolean,
    gameStatus: boolean
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
    dispatcherCardGame({
      type: "UPDATE_EXIT_WINDOW_STATUS",
      payload: exitWindowValue,
    });
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

  const getActivePage = () => {
    if (!cardGame.isCards && !cardGame.isExitWindow) {
      return "start";
    } else if (cardGame.isCards) {
      return "game";
    } else if (cardGame.isExitWindow) {
      return "exit";
    }
  };

  const activePage: any = getActivePage();

  const pages: any = {
    start: <UserInput handleInput={handleSubmit} />,
    game: (
      <Cards
        enteredNumber={cardGame.enteredNumber}
        changeCardStatus={changeCardStatus}
      />
    ),
    exit: (
      <ExitWindow
        displayUserInput={displayUserInput}
        retry={retry}
        gameComment={cardGame.gameComment}
      />
    ),
  };

  return pages[activePage] ?? null;
}

export default App;
