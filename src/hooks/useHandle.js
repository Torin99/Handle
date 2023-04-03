import { useState } from "react";

function useHandle(solution, signVal) {
  const [turn, setTurn] = useState(0); //guess count user is on (1-6)
  const [current, setCurrent] = useState(""); //what is currently being entered
  const [guessList, setGuessList] = useState([...Array(6)]); //list of previous guesses as arrays
  const [history, setHistory] = useState([]); //list of previous guesses as strings
  const [isCorrect, setIsCorrect] = useState(false); //true when user wins game
  const [usedLetters, setUsedLetters] = useState({}); //objects of letters and corresponding match colors used with letter keypad

  function formatGuess() {
    //before guess entry, compare to solution and color accordingly
    let solutionArray = [...solution]; //array of solution letters
    //create base object where all letters correspond to grey
    let formattedGuess = [...current].map((letter) => {
      return { key: letter, color: "grey" };
    });

    //if letter matches solution letter -> assign green
    formattedGuess.forEach((letter, i) => {
      if (solutionArray[i] === letter.key) {
        formattedGuess[i].color = "green";
        solutionArray[i] == null;
      }
    });
    //letter in word but doesn't match -> assign yellow
    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[i].color = "#B59F3B";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  }
  function addNewGuess(formatGuess) {
    // handle new guess entries

    //guess matches solution return found
    if (current === solution) {
      setIsCorrect(true);
    }
    //add new guess to guess list (check what letters are found)
    setGuessList((prev) => {
      let newGuesses = [...prev];
      newGuesses[turn] = formatGuess;
      return newGuesses;
    });
    //add new guess to history (check if been guessed already)
    setHistory((prev) => {
      return [...prev, current];
    });
    setTurn(turn + 1); //on new guess move to next turn
    // add formatted guess letters to used letters
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
    setCurrent(""); //on new guess set input to blank
  }
  function handleKeyup({ key }) {
    //handle text input via keyboard and sign
    //check for letter input
    var expression = new RegExp("^[a-zA-Z]$", "i"); //REGEX expression to compare if alpha
    if (key === " " && signVal && signVal !== "THUMBS UP") {
      //sign letter entry
      if (current.length < 5) {
        setCurrent((prev) => {
          return prev + signVal.toLowerCase();
        });
      }
    }
    if (key === "Enter" || (key === " " && signVal === "THUMBS UP")) {
      //guess submission enter or thumbs up + space
      //requirements: length of 5 char, not @ max turns, not duplicate
      if (turn > 5) {
        //don't add if out of turns
        console.log("Out of Turns");
        return;
      }
      if (history.includes(current)) {
        // don't add if already guessed
        console.log("Already Guessed");
        return;
      }
      if (current.length !== 5) {
        //don't add if not full word
        console.log("Not a Full Word");
        return;
      }
      const format = formatGuess(); // if all checks pass format and add guess
      addNewGuess(format);
    }
    if (key === "Backspace") {
      //delete letter
      if (current.length > 0) {
        setCurrent((prev) => {
          return prev.substring(0, prev.length - 1);
        });
      }
      return;
    }
    if (expression.test(String(key))) {
      //letter input when current input length < 5
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
