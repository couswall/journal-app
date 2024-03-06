import { Action, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { checkingCredentials, login, logout } from ".";
import { LoginEmailPassword, RegisterNewUser, loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { RootState } from "../store";
import { clearNotesLogout } from "../journal";

export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R



//Checking Authentication
export const checkingAuthentication = (): ThunkAction<void, RootState, unknown, UnknownAction>  => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
    }
}


//Start SignIn with Google
export const startGoogleSignIn = (): ThunkAction<void, RootState, unknown, UnknownAction> =>{
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();

        if( !result?.ok ) return dispatch( logout( result?.errorMessage ) );
        
        dispatch( login( result ) );
    }
}

// Create a new user with email and password
export const startCreatingUserWithEmailPassword = ({ displayName, email, password }: RegisterNewUser): ThunkAction<void, RootState, unknown, UnknownAction> => {
    return async ( dispatch ) => {
        
        dispatch( checkingCredentials() );
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ displayName, email, password });
        
        if(!ok) return dispatch( logout(errorMessage) );

        dispatch( login({ uid, displayName, email, photoURL }));
    
    }
}

// Start Sign In with email and password
export const startSignInWithEmailPassword = ({ email , password }: LoginEmailPassword): ThunkAction<void, RootState, unknown, UnknownAction>  => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const { ok, uid, displayName, photoURL, errorMessage } = await loginWithEmailPassword( { email, password } ); 
        
        if( !ok ) return dispatch( logout( errorMessage ) );

        dispatch( login({ uid, displayName, email, photoURL }) );
    }   
}



// Logout from from firebase
export const startLogoutFirebase = (): ThunkAction<void, RootState, unknown, UnknownAction> => {
    return async ( dispatch ) => {

        await logoutFirebase();
        dispatch( clearNotesLogout() ); 
        dispatch( logout( null ) );
    }
}