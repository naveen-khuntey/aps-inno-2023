// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcskI387PtLFCc9Sl36zRVCxeVQHpLFzQ",
  authDomain: "innovision-game.firebaseapp.com",
  projectId: "innovision-game",
  storageBucket: "innovision-game.appspot.com",
  messagingSenderId: "173552830436",
  appId: "1:173552830436:web:56fed770f71c624c33e9f1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
