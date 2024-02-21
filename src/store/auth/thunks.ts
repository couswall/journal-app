import { signInWithGoogle } from "../../firebase/providers"



//Start SignIn with Google
export const startGoogleSignIn = () =>{
    return async( dispatch ){

        const result = signInWithGoogle();
    }
}