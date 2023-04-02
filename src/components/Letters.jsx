import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

function Letters({ usedLetters }) {
  const [letters, setLetters] = useState(null);
  const [showDemo, setShowDemo] = useState(false);
  const [clickedLetter, setClickedLetter] = useState(null);

  function handleClick(letter) {
    setShowDemo(true);
    setClickedLetter(letter);
  }
  function handleClose() {
    setShowDemo(false);
    setClickedLetter(null);
  }
  console.log(showDemo);
  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then((resp) => resp.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);
  return (
    <div>
      <div className="letters">
        {letters &&
          letters.map((letter) => {
            const color = usedLetters[letter.key];
            return (
              <div
                className={letter.key}
                onClick={() => handleClick(letter)}
                style={{ background: color }}
                key={letter.key}
              >
                {letter.key.toUpperCase()}
              </div>
            );
          })}
      </div>
      {showDemo && (
        <div className="demo">
          <div>
            <img src={clickedLetter.image} alt={clickedLetter.key} />
            <button onClick={handleClose}>
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Letters;
