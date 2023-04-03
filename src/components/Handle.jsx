import { useState, useEffect } from "react";
import Board from "./Board/Board";
import GameEnd from "./GameEnd";

function Handle({
  solution, //random word answer
  current, //current text input
  guessList, //history of previous guesses
  handleKeyup, //keyboard input function
  isCorrect, //user input matches solution
  turn, //number of entries
}) {
  const [isEndGame, setIsEndGame] = useState(false); //display endgame component if true

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup); //take in keyboard input

    //solution guessed correctly -> display endgame component
    if (isCorrect) {
      setTimeout(() => setIsEndGame(true), 1000); //delay 1 sec
      window.removeEventListener("keyup", handleKeyup); //cleanup
    }
    //out of turns -> display endgame component
    if (turn > 5) {
      setTimeout(() => setIsEndGame(true), 1000); //delay 1 sec
      window.removeEventListener("keyup", handleKeyup); //cleanup
    }

    return () => window.removeEventListener("keyup", handleKeyup); //cleanup
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      {/* game board */}
      <Board current={current} guessList={guessList} turn={turn} />
      {isEndGame && ( //only display on game end
        //end game message
        <GameEnd solution={solution} isCorrect={isCorrect} turn={turn} />
      )}
    </div>
  );
}
export default Handle;
