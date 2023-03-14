import { useState } from "react";
function useHandle(solution) {
  const [turn, setTurn] = useState(0); //guess count user is on (1-6)
  const [current, setCurrent] = useState(""); //what is currently being entered
  const [guessList, setGuessList] = useState([]); //list of previous guesses as arrays
  const [history, setHistory] = useState([]); //list of previous guesses as strings
  const [isCorrect, setCorrect] = useState(false); //true when user wins game

  function formatGuess() {}
  function addNewGuess() {}
  function handleKeyup({ key }) {
    console.log(key);
  }

  return { turn, current, guessList, isCorrect, handleKeyup };
}
export default useHandle;
