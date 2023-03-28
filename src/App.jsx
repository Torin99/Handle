import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Handle from "./components/Handle";
import { TbHandRock } from "react-icons/tb";
import Detection from "./components/Detection";
import { memo } from "react";

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    //look for the server and then pick a random number and set it as the solution, from the library of solutions
    fetch("http://localhost:3001/solutions")
      .then((resp) => resp.json())
      .then((json) => {
        const rand = json[Math.floor(Math.random() * json.length)];
        setSolution(rand.word);
      });
  }, [setSolution]);
  console.log(solution);
  return (
    <>
      <div className="middle">
        <div className="title">
          <h2>
            HANDLE
            <TbHandRock />
          </h2>
          <div className="underline"></div>
        </div>
        {solution && (
          <>
            <Handle solution={solution} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
