import { useState } from "react";
import BoardRow from "./assets/row";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="Board">
        <BoardRow />
      </div>
    </div>
  );
}

export default App;
