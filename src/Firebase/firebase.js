import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7e1SB4OG9c9vniQvxFwmp2DniIi12HIc",
  authDomain: "pinaf-844a1.firebaseapp.com",
  projectId: "pinaf-844a1",
  storageBucket: "pinaf-844a1.appspot.com",
  messagingSenderId: "286629240458",
  appId: "1:286629240458:web:826ac169b02e68d9df9773",
  measurementId: "G-MRJDK0S4KC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
