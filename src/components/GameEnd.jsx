function GameEnd({ isCorrect, turn, solution }) {
  return (
    <div className="gameEnd">
      {isCorrect && (
        <div>
          <h1>Correct</h1>
          <p>{solution}</p>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1>Out of Guesses</h1>
          <p>{solution}</p>
        </div>
      )}
    </div>
  );
}
export default GameEnd;
