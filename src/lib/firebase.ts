import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZimL5svJEZok0H9S4Gub0x03z_X9F0_U",
  authDomain: "todo-d3dc5.firebaseapp.com",
  projectId: "todo-d3dc5",
  storageBucket: "todo-d3dc5.appspot.com",
  messagingSenderId: "132578800821",
  appId: "1:132578800821:web:d8bd6c8130833a693b79da"
};

// Initialize Firebase Application (safe for hot-reloads)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Database (Firestore)
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
