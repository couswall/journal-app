import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuth } from "./config";

interface RegisterNewUser {
    email: string; 
    password: string; 
    displayName: string; 
}

const googleProvider = new GoogleAuthProvider();

//Sign In with google
export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );

        const { uid, email, displayName, photoURL } = result.user;

        return{
            ok: true, 
            uid,
            email, 
            displayName, 
            photoURL
        }

    } catch (error) {

        if ( error instanceof Error) {
            const errorMessage = error.message;
            console.log(error);
            return{
                ok: false, 
                errorMessage
            }
        }

    }
}


//Register user with email and password
export const registerUserWithEmailPassword = async ({ email, password, displayName }: RegisterNewUser) => {

    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        console.log( resp );
    
    } catch (error) {
        if ( error instanceof Error) {
            const errorMessage = error.message;
            console.log(error);
            return{
                ok: false, 
                errorMessage
            }
        }
    }


}