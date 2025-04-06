// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDR3VSuWgzu1F1ZUANyyCLqv3klmaDDoeQ",
  authDomain: "flashcard-3932a.firebaseapp.com",
  projectId: "flashcard-3932a",
  storageBucket: "flashcard-3932a.firebasestorage.app",
  messagingSenderId: "1053039279384",
  appId: "1:1053039279384:web:18c79d915793cc46fc726d",
  measurementId: "G-M049FNCZQP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { addDoc, collection };
