// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-75Em0XhwbqPV0iBZ5s1v5pE735eQGPA",
  authDomain: "los-pollos-9cfd9.firebaseapp.com",
  projectId: "los-pollos-9cfd9",
  storageBucket: "los-pollos-9cfd9.appspot.com",
  messagingSenderId: "455956511816",
  appId: "1:455956511816:web:32c53c0511e43c793cac7d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)