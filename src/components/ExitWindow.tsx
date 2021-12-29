import Button from "./Button";

const ExitWindow = ({ displayUserInput, retry, gameComment }: any) => {
  return (
    <div className="exit-game-window">
      <p>{gameComment}</p>
      <Button onClick={retry}>Replay</Button>
      <Button onClick={displayUserInput}>Exit</Button>
    </div>
  );
};

export default ExitWindow;
