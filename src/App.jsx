import { useState, useEffect } from "react";
import BoardRow from "./row";
import "./App.css";
import Handle from "./components/Handle";

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
        <h2 className="titleText">HANDLE</h2>
        <div className="underline"></div>
      </div>
      <div className="App">
        {solution && (
          <>
            <Handle solution={solution} />
            <div className="Board">
              <BoardRow solution={solution.word} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
