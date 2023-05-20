// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6il-5yns-DGEravsr1AgvOvf3Wsfupis",
  authDomain: "react-firebase-crud-f6b94.firebaseapp.com",
  projectId: "react-firebase-crud-f6b94",
  storageBucket: "react-firebase-crud-f6b94.appspot.com",
  messagingSenderId: "439336387342",
  appId: "1:439336387342:web:2e65401a67b50d329f8d5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

const db = getFirestore();

export { db };
