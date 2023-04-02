import { useState } from "react";
function useHandle(solution, signVal) {
  const [turn, setTurn] = useState(0); //guess count user is on (1-6)
  const [current, setCurrent] = useState(""); //what is currently being entered
  const [guessList, setGuessList] = useState([...Array(6)]); //list of previous guesses as arrays
  const [history, setHistory] = useState([]); //list of previous guesses as strings
  const [isCorrect, setIsCorrect] = useState(false); //true when user wins game
  const [usedLetters, setUsedLetters] = useState({});

  function formatGuess() {
    let solutionArray = [...solution];
    let formattedGuess = [...current].map((letter) => {
      return { key: letter, color: "grey" };
    });

    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] == null;
      }
    });

    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[i].color = "#B59F3B";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  }
  function addNewGuess(formatGuess) {
    if (current === solution) {
      setIsCorrect(true);
    }
    setGuessList((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formatGuess;
      return newGuesses;
    });
    setHistory((prev) => {
      return [...prev, current];
    });
    setTurn(turn + 1);
    setUsedLetters((prev) => {
      let newLetters = { ...prev };
      formatGuess.forEach((l) => {
        const curr = newLetters[l.key];

        if (l.color === "green") {
          newLetters[l.key] = "green";
          return;
        }
        if (l.color === "#B59F3B" && curr !== "green") {
          newLetters[l.key] = "#B59F3B";
          return;
        }
        if (l.color === "grey" && (curr !== "green") & (curr !== "#B59F3B")) {
          newLetters[l.key] = "grey";
          return;
        }
      });
      return newLetters;
    });
    setCurrent("");
  }
  function handleKeyup({ key }) {
    //check for letter input
    var expression = new RegExp("^[a-zA-Z]$", "i");
    if (key === " " && signVal && signVal !== "THUMBS UP") {
      if (current.length < 5) {
        setCurrent((prev) => {
          return prev + signVal.toLowerCase();
        });
      }
    }
    if (key === "Enter" || (key === " " && signVal === "THUMBS UP")) {
      //requirements: length of 5 char, not @ max turns, not duplicate
      if (turn > 5) {
        console.log("Out of Turns");
        return;
      }
      if (history.includes(current)) {
        console.log("Already Guessed");
        return;
      }
      if (current.length !== 5) {
        console.log("Not a Full Word");
        return;
      }
      const format = formatGuess();
      addNewGuess(format);
    }
    if (key === "Backspace") {
      if (current.length > 0) {
        setCurrent((prev) => {
          return prev.substring(0, prev.length - 1);
        });
      }
      return;
    }
    if (expression.test(String(key))) {
      if (current.length < 5) {
        setCurrent((prev) => {
          return prev + key.toLowerCase();
        });
      }
    }
  }

  return { turn, current, guessList, isCorrect, handleKeyup, usedLetters };
}
export default useHandle;
