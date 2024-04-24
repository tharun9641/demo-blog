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
  //  REPLACE WITH YOUR FIREBASE CONFIG
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleAuth = new GoogleAuthProvider();
export const database = getFirestore(app);
export const FileStorage = getStorage(app);
export const auth = getAuth(app);
