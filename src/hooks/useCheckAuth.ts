import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { useEffect } from "react";



export const useCheckAuth = () => {
    const { status } = useSelector( (state: RootState) => state.auth );
  
    const dispatch = useDispatch<AppDispatch>();
  
    
    useEffect(() => {
      
      onAuthStateChanged( FirebaseAuth, async( user ) => {
        const errorMessage = null; 
        if( !user ) return dispatch( logout( errorMessage ) );
        
        const { uid, displayName, email, photoURL } = user;
        
        dispatch( login({ uid, displayName, email, photoURL, }) );
      })
      
    }, []);

    return{
        status
    }
}
