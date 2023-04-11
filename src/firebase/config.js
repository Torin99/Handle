import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe5A79g4UEPIJqNdVGaK5-Daj0hiVLIys",
  authDomain: "handle-asl.firebaseapp.com",
  projectId: "handle-asl",
  storageBucket: "handle-asl.appspot.com",
  messagingSenderId: "688471013370",
  appId: "1:688471013370:web:efcc73680c17b3a7249643",
  measurementId: "G-GCD11Z5G3J",
};

firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.firestore();

export default projectStorage;
