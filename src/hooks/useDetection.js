import { Hands } from "@mediapipe/hands";
import React, { useRef, useEffect, useState } from "react";
import * as Hands2 from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";
import signs from "../../data/sign_data";

function useDetection() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  const landmark = window.drawLandmarks;
  let prevSignVal = "";
  const [signVal, setSignVal] = useState("");
  // const signVal = useRef("");

  var camera = null;
  var camera_on = false;
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

  function check_position(index_array, min_array, max_array) {
    let positions = [8, 9, 16, 17, 24, 25, 32, 33, 40, 41];

    for (let index in positions) {
      if (index_array[positions[index]] > max_array[index]) return false;

      if (index_array[positions[index]] < min_array[index]) return false;
    }
    return true;
  }
  function check_position2(index_array) {
    for (let sign of signs) {
      let max_array = sign.max_array;
      let min_array = sign.min_array;
      if (check_position(index_array, min_array, max_array)) {
        if (prevSignVal === "" || prevSignVal !== sign.sign) {
          prevSignVal = sign.sign;
          // signVal.current = sign.sign;
          // console.log(signVal.current);

          setSignVal(sign.sign);
        }
        return sign.sign;
      }
    }
    return "";
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

      rows.push(new_list);

      check_position2(new_list);
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
      //if our webcam "exists", or in english if we have permission (!== compares value and type) and if it's not already on
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null && camera_on == false
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current.video }); //for each frame send the hands object the current video frame for processing
        },
        width: 640,
        height: 480,
      });
      camera.start();
      camera_on = true;
    }
  });

  return { webcamRef, canvasRef, csv, signVal };
}
export default useDetection;
