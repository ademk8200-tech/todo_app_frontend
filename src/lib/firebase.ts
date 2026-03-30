import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCZiMl5svJEZokB3Hrf1Z9tT_tDKQYOZ5A",
  authDomain: "todo-d3dc5.firebaseapp.com",
  projectId: "todo-d3dc5",
  storageBucket: "todo-d3dc5.firebasestorage.app",
  messagingSenderId: "132578800821",
  appId: "1:132578800821:web:d5434cf9f0c09680c03afc",
  measurementId: "G-Y7SM9TR15D"
};

// Initialize Firebase Application (safe for hot-reloads)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics
export const analytics = getAnalytics(app);

// Initialize Firebase Database (Firestore)
export const db = getFirestore(app);

// Initialize Firebase Auth
export const auth = getAuth(app);
