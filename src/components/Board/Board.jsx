import React from "react";
import BoardRow from "./BoardRow";
import { div } from "@tensorflow/tfjs";
function Board({ current, guessList, turn }) {
  let word = (current + "     ").substring(0, 5).split("");
  return (
    <div className="Board">
      {guessList.map((guess, i) => {
        if (turn === i) {
          return <BoardRow key={i} current={word} />;
        } else {
          return (
            <div>
              <BoardRow
                key={i}
                guess={guess}
                boardClass={turn - 1 === i ? "BoardRowCurrent" : "BoardRow"}
              />
            </div>
          );
        }
      })}
      {/* <BoardRow entry={word} /> */}
    </div>
  );
}
export default Board;
