import React from "react";
import BoardRow from "./BoardRow";
function Board({ current, guessList, turn }) {
  let word = (current + "     ").substring(0, 5).split("");
  return (
    <div className="Board">
      {guessList.map((guess, i) => {
        if (turn === i) {
          return <BoardRow key={i} current={word} />;
        } else {
          return <BoardRow key={i} guess={guess} />;
        }
      })}
      {/* <BoardRow entry={word} /> */}
    </div>
  );
}
export default Board;
