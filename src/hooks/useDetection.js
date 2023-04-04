import { useRef, useEffect, useState } from "react";

import { Hands } from "@mediapipe/hands";
import * as Hands2 from "@mediapipe/hands";
import * as cam from "@mediapipe/camera_utils";

import signs from "../../data/sign_data";

function useDetection() {
  const [initialRender, setInitialRender] = useState(true); //start camera only on initial render
  const webcamRef = useRef(null); //current cam value
  const canvasRef = useRef(null); //current canvas value

  //mediapipe draw functions found @ scripts in index.html
  const connect = window.drawConnectors;
  const landmark = window.drawLandmarks;

  const [signVal, setSignVal] = useState(""); //letter detected from hand signs to be used in game

  var camera = null; //mediapipe camera
  let rows = []; //array to store landmark data for csv retrieval

  // filter data detected from mediapipe landmarks to only x and y components.
  //alter data to work with camera height + width
  function calc_landmarks(landmarks, w, h) {
    let landmark_point = [];

    for (let landmark of landmarks) {
      for (let values of landmark) {
        let new_x = Math.min(parseInt(values.x * w), w - 1); //assure values are <= 1
        let new_y = Math.min(parseInt(values.y * h), h - 1);
        landmark_point.push([new_x, new_y]);
      }
    }
    return landmark_point;
  }
  //set all landmark values to be relative to the wrist
  function process_landmarks(landmark_point) {
    let temp = [];
    let new_landmark_point = [];
    for (let i in landmark_point) {
      let base_x = 0;
      let base_y = 0;

      if (i === "0") {
        //at wrist index
        base_x = landmark_point[0][0]; //wrist x value
        base_y = landmark_point[0][1]; //wrist y value
      }

      temp.push(
        Math.abs(parseInt(landmark_point[i][0] - base_x)), //new x value = x - wrist-x (wrist becomes 0)
        Math.abs(parseInt(landmark_point[i][1] - base_y)) //new y value = y - wrist-y (wrist becomes 0)
      );
    }
    //normalize data
    let max = Math.max(...temp);
    //divide all data by max value in landmarks
    for (let j in temp) {
      new_landmark_point.push(temp[j] / max);
    }
    return new_landmark_point;
  }

  function check_position(index_array, min_array, max_array) {
    //detect if hand landmarks match with sign letters min and max values
    //used with detect_letter function
    //return true if specific sign letter detected

    let positions = [8, 9, 16, 17, 24, 25, 32, 33, 40, 41]; //index of finger and thumb tips in data

    for (let index in positions) {
      //check if finger tip value fits within min and max ranges if not return false
      if (index_array[positions[index]] > max_array[index]) return false;

      if (index_array[positions[index]] < min_array[index]) return false;
    }
    return true; //letter detected
  }
  function detect_letter(index_array) {
    for (let sign of signs) {
      //letters in sign_data.js
      let max_array = sign.max_array; //sign max values
      let min_array = sign.min_array; //sign min values
      if (check_position(index_array, min_array, max_array)) {
        //if current letter matches hand landmark data return letter
        if (signVal === "" || signVal !== sign.sign) {
          //if value has not already been set
          setSignVal(sign.sign); //set useState value
        }
        return sign.sign;
      }
    }
    return ""; //no value found
  }

  function onResults(results) {
    //check if hand detected on screen

    //width & height used to adjust data to webcam and sync with canvas
    let width = webcamRef.current.video.videoWidth;
    let height = webcamRef.current.video.videoHeight;

    if (results.multiHandLandmarks.length != 0) {
      let landmark_point = calc_landmarks(
        //adjust landmark data to screen height and width
        results.multiHandLandmarks,
        width,
        height
      );
      let new_list = process_landmarks(landmark_point); //normalize data

      rows.push(new_list); //save data to downloadable csv file for min and max adjustment

      detect_letter(new_list); //if results corresponds to hand sign set signval to detected letter
    }

    //setting canvas height and width
    canvasRef.current.width = width;
    canvasRef.current.height = height;

    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    //create detection box on screen
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

    //draw hand landmarks and connections on screen
    if (results.multiHandLandmarks) {
      //hand detected
      for (const landmarks of results.multiHandLandmarks) {
        connect(canvasCtx, landmarks, Hands2.HAND_CONNECTIONS, {
          //mediapipe call to draw hand connections
          color: "white",
          lineWidth: 5,
        });
        landmark(canvasCtx, landmarks, {
          //mediapipe call to draw hand landmarks
          color: "blue",
          lineWidth: 2,
        });
      }
    }
    canvasCtx.restore();
    canvasCtx.globalCompositeOperation = "lighter"; //make green detection square translucent
    canvasCtx.strokeRect(canvasElement.width / 2 - 100, 100, 200, 200); //draw detection box
  }

  //download hand data to csv on button click
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
        //find mediapipe files
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.8, //80% confidence there is hand on screen
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
      if (initialRender) {
        // only start mediapipe camera on initial render to avoid lag
        camera.start();
        setInitialRender(false);
      }
    }
  });

  return { webcamRef, canvasRef, csv, signVal };
}
export default useDetection;
