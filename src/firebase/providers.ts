import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

//Sign In with google
export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
    } catch (error) {
        
    }
}