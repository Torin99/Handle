function GameEnd({ isCorrect, turn, solution }) {
  return (
    <div className="gameEnd">
      {isCorrect && (
        <div>
          <h2 className="endText">Correct!</h2>
          <h3 className="endText">The word was</h3>
          <h2 className="solution">{solution.toUpperCase()}</h2>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h2 className="endText">Out of Guesses :( </h2>
          <h3 className="endText">The word was</h3>
          <h2 style={{ color: "red" }}>{solution.toUpperCase()}</h2>
        </div>
      )}
    </div>
  );
}
export default GameEnd;
