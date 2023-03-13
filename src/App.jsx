import { useState, useEffect } from "react";
import BoardRow from "./assets/row";
import "./App.css";

function App() {
  const [solution, setSolution] = useState({ word: "hello" });

  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((resp) => resp.json())
      .then((json) => {
        const rand = json[Math.floor(Math.random() * json.length)];
        setSolution(rand);
      });
  }, [setSolution]);
  console.log(solution);
  return (
    <div className="App">
      <div className="Board">
        <BoardRow solution={solution.word} />
      </div>
    </div>
  );
}

export default App;
