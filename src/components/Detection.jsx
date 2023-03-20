import { Hands } from "@mediapipe/hands";
import React, { useRef, useEffect } from "react";
import * as Hands2 from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";

function Detection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  const landmark = window.drawLandmarks;
  var camera = null;
  let rows = [];

  function calc_landmarks(landmarks, w, h) {
    let landmark_point = [];

    for (let landmark of landmarks) {
      for (let values of landmark) {
        let new_x = Math.min(parseInt(values.x * w), w - 1);
        let new_y = Math.min(parseInt(values.y * h), h - 1);
        landmark_point.push([new_x, new_y]);
      }
    }
    return landmark_point;
  }
  function process_landmarks(landmark_point) {
    let temp = [];
    let new_landmark_point = [];
    for (let i in landmark_point) {
      let base_x = 0;
      let base_y = 0;
      // console.log(index);
      if (i === "0") {
        base_x = landmark_point[0][0];
        base_y = landmark_point[0][1];
      }

      temp.push(
        Math.abs(parseInt(landmark_point[i][0] - base_x)),
        Math.abs(parseInt(landmark_point[i][1] - base_y))
      );
    }
    let max = Math.max(...temp);
    for (let j in temp) {
      new_landmark_point.push(temp[j] / max);
    }
    return new_landmark_point;
  }

  function onResults(results) {
    let width = webcamRef.current.video.videoWidth;
    let height = webcamRef.current.video.videoHeight;

    if (results.multiHandLandmarks.length != 0) {
      let landmark_point = calc_landmarks(
        results.multiHandLandmarks,
        width,
        height
      );
      let new_list = process_landmarks(landmark_point);
      console.log(new_list[6], new_list[7]);
    }

    //setting canvas height and width
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.strokeStyle = "green";
    canvasCtx.lineWidth = 10;

    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        // console.log(landmarks);
        connect(canvasCtx, landmarks, Hands2.HAND_CONNECTIONS, {
          color: "white",
          lineWidth: 5,
        });
        landmark(canvasCtx, landmarks, {
          color: "blue",
          lineWidth: 2,
        });
      }
    }
    canvasCtx.restore();
    canvasCtx.globalCompositeOperation = "lighter";
    canvasCtx.strokeRect(canvasElement.width / 2 - 100, 100, 200, 200);
  }

  function csv() {
    let csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  useEffect(() => {
    const hands = new Hands({
      //setup new hands object used for detection
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5, //50% confidence there is hand on screen
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    if (
      //if our webcam "exists", or in english if we have permission (!== compares value and type)
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current.video }); //for each frame send the hands object the current video frame for processing
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  });

  return (
    <div>
      <button onClick={csv}>CSV</button>
      <br />
      <Webcam
        ref={webcamRef}
        mirrored={false}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginRight: "auto",
          marginLeft: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 9,
          width: 640,
          height: 480,
        }}
      ></canvas>
    </div>
  );
}
export default Detection;
