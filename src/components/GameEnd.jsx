function GameEnd({ isCorrect, solution }) {
  //display text on game end, successful guess or out of tuns
  return (
    <div className="gameEnd">
      {isCorrect && ( //guessed correctly
        <div>
          <h2 className="endText">Correct!</h2>
          <h3 className="endText">The word was</h3>
          <h2 className="solution">{solution.toUpperCase()}</h2>
        </div>
      )}
      {!isCorrect && ( //out of turns
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
