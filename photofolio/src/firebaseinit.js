// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXIPSBTRr-BTlP8WhMnBNb3MneKzfvzRA",
  authDomain: "photofolio-a9c14.firebaseapp.com",
  projectId: "photofolio-a9c14",
  storageBucket: "photofolio-a9c14.appspot.com",
  messagingSenderId: "195271315805",
  appId: "1:195271315805:web:2241735a2378f219ba18b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);