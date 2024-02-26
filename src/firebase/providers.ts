import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";
import { FirebaseError } from "firebase/app";

export interface RegisterNewUser {
    email: string; 
    password: string; 
    displayName: string; 
}

export interface ReturnRegisterNewUser {
    ok?: boolean; 
    uid?: string; 
    email?: string;
    displayName?: string; 
    photoURL?: string | null;
    errorMessage?: Error | null | string; 

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
export const registerUserWithEmailPassword = async ({ displayName, email, password }: RegisterNewUser ): Promise<ReturnRegisterNewUser> => {

    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL } = resp.user; 

        await updateProfile( FirebaseAuth.currentUser!, { displayName });

        return{
            ok: true, 
            uid, 
            photoURL, 
            displayName, 
            email
        }
    
    } catch (error) {
 
        if ( error instanceof FirebaseError) {
            let errorMessage = error.message;
            if ( error.code === 'auth/email-already-in-use') {
                errorMessage = 'Ya existe una cuenta con el correo'
            }

            return{
                ok: false, 
                errorMessage
            }
        }

        return{}
    }


}