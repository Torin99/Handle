import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Handle from "./components/Handle";
import { ToggleSlider } from "react-toggle-slider";

import { TbHandRock } from "react-icons/tb";
import Detection from "./components/Detection";
import useDetection from "./hooks/useDetection";
import useHandle from "./hooks/useHandle";
import Letters from "./components/Letters";
import EntrySquare from "./components/EntrySquare";

function App() {
  const [solution, setSolution] = useState(null);
  const [showWebcam, setShowWebcam] = useState(true);

  const { webcamRef, canvasRef, csv, signVal } = useDetection();

  const { current, guessList, handleKeyup, isCorrect, turn, usedLetters } =
    useHandle(solution, signVal);
  console.log(signVal);

  useEffect(() => {
    //look for the server and then pick a random number and set it as the solution, from the library of solutions
    fetch("http://localhost:3001/solutions")
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
          <div className="toggle">
            <p>Webcam</p>
            <ToggleSlider
              barBackgroundColorActive="hsl(205, 78%, 60%)"
              onToggle={() => setShowWebcam(!showWebcam)}
            />
          </div>
          {showWebcam && (
            <div>
              <Detection
                key={new Date().getTime}
                webcamRef={webcamRef}
                canvasRef={canvasRef}
                csv={csv}
              />
              <EntrySquare signVal={signVal} />
            </div>
          )}
        </div>
        <div className="middle">
          {solution && (
            <Handle
              solution={solution}
              signVal={signVal}
              current={current}
              guessList={guessList}
              handleKeyup={handleKeyup}
              isCorrect={isCorrect}
              turn={turn}
              usedLetters={usedLetters}
            />
          )}
        </div>
        <div className="right">
          <Letters usedLetters={usedLetters} />
        </div>
      </div>
    </>
  );
}

export default App;
