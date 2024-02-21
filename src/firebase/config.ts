// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const FIRE_BASE_TOKEN = import.meta.env.VITE_API_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIRE_BASE_TOKEN,
  authDomain: "journal-react-redux-ts.firebaseapp.com",
  projectId: "journal-react-redux-ts",
  storageBucket: "journal-react-redux-ts.appspot.com",
  messagingSenderId: "951243042814",
  appId: "1:951243042814:web:b6c025206380064c935aaf"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const FirebaseAuth = getAuth(FirebaseApp);

// Initialize Cloud Firestore and get a reference to the service
export const FirebaseDB = getFirestore( FirebaseApp );
