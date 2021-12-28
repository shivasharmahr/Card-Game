const initialState = {
  enteredNumber: 0,
  isCards: false,
  isExitWindow: false,
  gameComment: "",
};

const reducer = (state: any, action: any) => {
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

export { initialState, reducer };
