import React from "react";
function BoardRow({ current, guess }) {
  if (guess) {
    return (
      <div className="BoardRow">
        {guess.map((letter, index) => (
          <div
            className="BoardSquare"
            key={index}
            style={{
              background: letter.color,
            }}
          >
            <h2>{letter.key}</h2>
          </div>
        ))}
      </div>
    );
  } else if (current) {
    return (
      <div className="BoardRowCurrent">
        {current.map((letter, index) => (
          <div className="BoardSquare" key={index}>
            <h2>{letter}</h2>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="BoardRow">
        <div className="BoardSquare"></div>
        <div className="BoardSquare"></div>
        <div className="BoardSquare"></div>
        <div className="BoardSquare"></div>
        <div className="BoardSquare"></div>
      </div>
    );
  }
}

export default BoardRow;
