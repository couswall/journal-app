import { Action, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { checkingCredentials } from ".";
import { signInWithGoogle } from "../../firebase/providers"
import { RootState } from "../store";

export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R

//Checking Authentication
export const checkingAuthentication = ( email: string, password: string ): ThunkAction<void, RootState, unknown, UnknownAction>  => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
    }
}


//Start SignIn with Google
export const startGoogleSignIn = () =>{
    return async( dispatch ) => {

        dispatch( checkingCredentials() );

        const result = signInWithGoogle();
    }
}