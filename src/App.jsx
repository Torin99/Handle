import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import Handle from "./components/Handle";
import { TbHandRock } from "react-icons/tb";

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((resp) => resp.json())
      .then((json) => {
        const rand = json[Math.floor(Math.random() * json.length)];
        setSolution(rand);
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
