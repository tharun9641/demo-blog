// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDLpie0J_VrcGS2jlDdiNKeRAe9b44DeIw",
  authDomain: "react-scroller.firebaseapp.com",
  projectId: "react-scroller",
  storageBucket: "react-scroller.appspot.com",
  messagingSenderId: "782005320670",
  appId: "1:782005320670:web:6b3e8703674add2c817b4f",
  measurementId: "G-8R64C0D16S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleAuth = new GoogleAuthProvider();
export const database = getFirestore(app);
export const FileStorage = getStorage(app);
export const auth = getAuth(app);
