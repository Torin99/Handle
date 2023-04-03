import "./App.css";
import { useState, useEffect } from "react";

import useDetection from "./hooks/useDetection";
import useHandle from "./hooks/useHandle";

import { TbHandRock } from "react-icons/tb";

import Detection from "./components/Detection";
import EntrySquare from "./components/EntrySquare";
import Handle from "./components/Handle";
import Letters from "./components/Letters";

function App() {
  const [solution, setSolution] = useState(null); //store random word

  const { webcamRef, canvasRef, csv, signVal } = useDetection(); //detection inputs, webcam and mediapipe values
  const { current, guessList, handleKeyup, isCorrect, turn, usedLetters } =
    useHandle(solution, signVal); //handle inputs/game logic

  //fetch random solution data
  useEffect(() => {
    //look for the server and then pick a random number and set it as the solution, from the library of solutions
    fetch("http://localhost:3001/solutions") //data hosted from library.json
      .then((resp) => resp.json())
      .then((json) => {
        const rand = json[Math.floor(Math.random() * json.length)];
        setSolution(rand.word);
      });
  }, [setSolution]);
  return (
    <>
      <div className="title">
        <h2>
          HANDLE
          <TbHandRock />
        </h2>
        <div className="underline"></div>
      </div>
      <div className="App">
        <div className="left">
          <Detection webcamRef={webcamRef} canvasRef={canvasRef} csv={csv} />
          {/* display detected ASL letter */}
          <EntrySquare signVal={signVal} />
        </div>
        <div className="middle">
          {solution && ( //display if successful data fetch
            //game board
            <Handle
              solution={solution}
              current={current}
              guessList={guessList}
              handleKeyup={handleKeyup}
              isCorrect={isCorrect}
              turn={turn}
            />
          )}
        </div>
        <div className="right">
          {/* letter keypad */}
          <Letters usedLetters={usedLetters} />
        </div>
      </div>
    </>
  );
}

export default App;
