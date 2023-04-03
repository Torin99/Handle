import React from "react";
import BoardRow from "./BoardRow";

function Board({ current, guessList, turn }) {
  let word = (current + "     ").substring(0, 5).split("");
  return (
    <div className="Board">
      {guessList.map((guess, i) => {
        if (turn === i) {
          //current guess row
          return <BoardRow key={i} current={word} />;
        } else {
          return (
            <BoardRow //all other rows
              key={i}
              guess={guess}
              boardClass={turn - 1 === i ? "BoardRowCurrent" : "BoardRow"}
            />
          );
        }
      })}
    </div>
  );
}
export default Board;
