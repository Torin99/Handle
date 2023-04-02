import React, { useState } from "react";
import { useEffect, memo } from "react";
import Board from "./Board/Board";
import GameEnd from "./GameEnd";

function Handle({
  solution,
  signVal,
  current,
  guessList,
  handleKeyup,
  isCorrect,
  turn,
  usedLetters,
}) {
  const [isEndGame, setIsEndGame] = useState(false);
  // const [temp, setTemp] = useState(signValRef.current);
  // console.log(temp);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    if (isCorrect) {
      setTimeout(() => setIsEndGame(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    if (turn > 5) {
      setTimeout(() => setIsEndGame(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div>
      {/* Solution - {solution} */}

      <div className="mid">
        {/* Guess - {current} */}
        {/* <BoardRow solution={solution.word} /> */}
        <Board
          current={current}
          guessList={guessList}
          // solution={solution}
          turn={turn}
        />
        {isEndGame && (
          <GameEnd solution={solution} isCorrect={isCorrect} turn={turn} />
        )}
      </div>

      {/* <div className="Board">{solution && <BoardRow solution={current} />}</div> */}
    </div>
  );
}
export default memo(Handle);
