import useDetection from "../hooks/useDetection";
import EntrySquare from "./EntrySquare";
import Camera from "./Camera";
import { memo, useState, useEffect } from "react";

function Detection({ webcamRef, canvasRef, csv, signVal }) {
  return (
    <div>
      {/* <button onClick={csv}>CSV</button> */}
      <div>
        <br />
        <Camera canvasRef={canvasRef} webcamRef={webcamRef} />
        <br />
      </div>
      <EntrySquare signVal={signVal} />
    </div>
  );
}
export default memo(Detection);
