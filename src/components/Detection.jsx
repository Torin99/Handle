import Webcam from "react-webcam";
import useDetection from "../hooks/useDetection";

function Detection() {
  const { webcamRef, canvasRef, csv } = useDetection();
  return (
    <div>
      <button onClick={csv}>CSV</button>
      <br />
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "start",
          zIndex: 9,
          width: 320,
          height: 240,
          visibility: "hidden",
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "relative",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "start",
          zIndex: 9,
          width: 320,
          height: 240,
          border: "5px solid hsl(205, 78%, 60%)",
          borderRadius: "25px",
        }}
      ></canvas>
    </div>
  );
}
export default Detection;
