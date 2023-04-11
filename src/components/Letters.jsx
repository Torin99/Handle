import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import projectStorage from "../firebase/config";

function Letters({ usedLetters }) {
  //keypad of clickable letters corresponding to past guesses
  const [letters, setLetters] = useState(null); //letters set on data fetch
  const [showDemo, setShowDemo] = useState(false); //boolean value on letter click display demo image
  const [clickedLetter, setClickedLetter] = useState(null);

  function handleClick(letter) {
    //on letter click show demo of sed letter
    setShowDemo(true);
    setClickedLetter(letter);
  }
  function handleClose() {
    //on close of demo
    setShowDemo(false);
    setClickedLetter(null);
  }

  useEffect(() => {
    //fetch data from firebase
    projectStorage
      .collection("Letters")
      .get()
      .then((resp) => {
        let results = [];
        resp.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setLetters(results);
      });
  }, [setLetters]);

  return (
    <div>
      <div className="letters">
        {letters && //show only on successful data fetch
          letters.map((letter) => {
            const color = usedLetters[letter.key]; //find color based on matching key
            return (
              <div
                className={letter.key}
                onClick={() => handleClick(letter)} //show demo of letter
                style={{ background: color }} //set color from solution accuracy
                key={letter.key}
              >
                {letter.key.toUpperCase()}
              </div>
            );
          })}
      </div>
      {showDemo && ( //only show demo on letter click
        <div className="demo">
          <div>
            <img src={clickedLetter.image} alt={clickedLetter.key} />
            <button onClick={handleClose}>
              {/* close demo button */}
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Letters;
