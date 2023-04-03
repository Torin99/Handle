import React from "react";
function BoardRow({ i, current, guess, boardClass }) {
  if (guess) {
    return (
      //display previous guesses
      // if most recent guess add different class for animation on submit
      <div className={boardClass}>
        {guess.map((letter, index) => (
          <div
            className="BoardSquare"
            key={index}
            style={{
              background: letter.color,
            }}
          >
            <h2>{letter.key}</h2>
            <p>{i}</p>
          </div>
        ))}
      </div>
    );
  } else if (current) {
    //display current guess row
    return (
      <div className="BoardRow">
        {current.map((letter, index) => (
          <div className="BoardSquare" key={index}>
            <h2>{letter}</h2>
          </div>
        ))}
      </div>
    );
  } else {
    //display empty rows with no previous guesses or current guess
    return (
      //
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
