import React from "react";
function BoardRow({ entry, solution }) {
  function check_color(solution, index, letter) {
    let color = "grey";
    if (letter === " ") {
      return "";
    } else if (solution.word[index] === letter) {
      color = "green";
    } else if (solution.word.includes(letter)) {
      color = "#B59F3B"; //the fancy yellow
    }
    return color;
  }

  return (
    <div className="BoardRow">
      {entry.map((letter, index) => (
        <div
          className="BoardSquare"
          key={index}
          style={{
            background: check_color(solution, index, entry[index]),
          }}
        >
          <h2>{letter}</h2>
        </div>
      ))}
    </div>
  );
}

export default BoardRow;
