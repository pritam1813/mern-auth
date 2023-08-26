import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-50f5a.firebaseapp.com",
  projectId: "mern-auth-50f5a",
  storageBucket: "mern-auth-50f5a.appspot.com",
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
