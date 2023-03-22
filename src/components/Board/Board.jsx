import React from "react";
import BoardRow from "./BoardRow";
function Board({ entry, guessList, solution }) {
  let word = (entry + "     ").substring(0, 5).split("");
  return (
    <div className="Board">
      {guessList.map((guess) => (
        <BoardRow
          key={guessList.indexOf(guess)}
          entry={guess}
          solution={solution}
        />
      ))}
      <BoardRow entry={word} solution={solution} />
    </div>
  );
}
export default Board;
