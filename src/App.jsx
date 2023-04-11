import "./App.css";
import { useState, useEffect } from "react";

import useDetection from "./hooks/useDetection";
import useHandle from "./hooks/useHandle";

import { TbHandRock } from "react-icons/tb";
import { BsInfoCircle } from "react-icons/bs";

import Detection from "./components/Detection";
import EntrySquare from "./components/EntrySquare";
import Handle from "./components/Handle";
import Letters from "./components/Letters";

import projectStorage from "./firebase/config";

function App() {
  const [solution, setSolution] = useState(null); //store random word
  const [isHover, setIsHover] = useState(false);

  const { webcamRef, canvasRef, csv, signVal } = useDetection(); //detection inputs, webcam and mediapipe values
  const { current, guessList, handleKeyup, isCorrect, turn, usedLetters } =
    useHandle(solution, signVal); //handle inputs/game logic

  //fetch solution data from firebase
  useEffect(() => {
    projectStorage
      .collection("Solutions")
      .get()
      .then((resp) => {
        let results = [];
        resp.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        const rand = results[Math.floor(Math.random() * results.length)]; //select random word
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
          <div
            className="tooltip"
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          >
            <BsInfoCircle className="tooltipIcon" />
          </div>

          {isHover && (
            <div className="tooltipText">
              <p>Sign your letter within the green detection box</p>
              <p> Press SPACE to input the detected letter</p>
            </div>
          )}

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
