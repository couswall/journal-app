// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const FIRE_BASE_TOKEN = import.meta.env.VITE_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const MSG_SENDER_ID = import.meta.env.VITE_MESSAGIND_SENDER_ID;
const APP_ID = import.meta.env.VITE_APP_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIRE_BASE_TOKEN,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MSG_SENDER_ID,
  appId: APP_ID,
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const FirebaseAuth = getAuth(FirebaseApp);

// Initialize Cloud Firestore and get a reference to the service
export const FirebaseDB = getFirestore( FirebaseApp );
