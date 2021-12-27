const ExitWindow = ({ displayUserInput, retry, gameComment }: any) => {
  return (
    <div className="exit-game-window">
      <p>{gameComment}</p>
      <button onClick={retry}>RePlay</button>
      <button onClick={displayUserInput}>Exit</button>
    </div>
  );
};

export default ExitWindow;
