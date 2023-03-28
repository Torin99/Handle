import React, { useState } from "react";
import { useEffect, memo } from "react";
import useHandle from "../hooks/useHandle";
import useDetection from "../hooks/useDetection";
import Board from "./Board/Board";
import Letters from "./Letters";
import Detection from "./Detection";

function Handle({ solution }) {
  const { webcamRef, canvasRef, csv, signVal } = useDetection();
  const { current, guessList, handleKeyup, isCorrect, turn, usedLetters } =
    useHandle(solution, signVal);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  return (
    <div className="App">
      {/* Solution - {solution} */}
      <div className="left">
        <Detection
          webcamRef={webcamRef}
          canvasRef={canvasRef}
          csv={csv}
          signVal={signVal}
        />
      </div>
      <div className="mid">
        {/* Guess - {current} */}
        {/* <BoardRow solution={solution.word} /> */}
        <Board
          current={current}
          guessList={guessList}
          // solution={solution}
          turn={turn}
        />
      </div>
      <div className="right">
        <Letters usedLetters={usedLetters} />
      </div>
      {/* <div className="Board">{solution && <BoardRow solution={current} />}</div> */}
    </div>
  );
}
export default memo(Handle);
