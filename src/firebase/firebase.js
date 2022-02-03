// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj5IfIXCkKvxpyGgWpahWXl-OO4T4wNs0",
  authDomain: "clone-a07d0.firebaseapp.com",
  projectId: "clone-a07d0",
  storageBucket: "clone-a07d0.appspot.com",
  messagingSenderId: "309331135478",
  appId: "1:309331135478:web:83a3e0508256ae964d95d7",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099")

export const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);


