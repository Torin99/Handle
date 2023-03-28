import { useState, useEffect } from "react";
function Letters({ usedLetters }) {
  const [letters, setLetters] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3001/letters")
      .then((resp) => resp.json())
      .then((json) => {
        setLetters(json);
      });
  }, []);
  return (
    <div className="letters">
      {letters &&
        letters.map((letter) => {
          const color = usedLetters[letter.key];
          return (
            <div style={{ background: color }} key={letter.key}>
              {letter.key}
            </div>
          );
        })}
    </div>
  );
}
export default Letters;
