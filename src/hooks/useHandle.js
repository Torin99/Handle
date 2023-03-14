import { useState } from "react";
function useHandle(solution) {
  const [turn, setTurn] = useState(0); //guess count user is on (1-6)
  const [current, setCurrent] = useState(""); //what is currently being entered
  const [guessList, setGuessList] = useState([]); //list of previous guesses as arrays
  const [history, setHistory] = useState([]); //list of previous guesses as strings
  const [isCorrect, setCorrect] = useState(false); //true when user wins game

  function formatGuess() {
    setHistory((prev) => [...prev, current]);
    setGuessList((prev) => [...prev, current.split("")]);
    setCurrent("");
    console.log("Entered Guess: ", current);
  }
  function addNewGuess() {}
  function handleKeyup({ key }) {
    //check for letter input
    var expression = new RegExp("^[a-zA-Z]$", "i");
    if (key === "Enter") {
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
      formatGuess(current);
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
          return prev + key;
        });
      }
    }
  }

  return { turn, current, guessList, history, isCorrect, handleKeyup };
}
export default useHandle;
