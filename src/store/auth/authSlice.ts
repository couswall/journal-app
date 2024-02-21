import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface UserState {
  status: string; 
  uid: string | null; 
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  errorMessage: string | null | Error;
}

const initialState: UserState = {
    status: 'not-authenticated',  // 'checking', 'authenticated', 'not-authenticated'
    uid: null, 
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //Login Reducer
    login: ( state, { payload } ) => {
      state.status = 'authenticated';
      state.uid = payload.uid;
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoUrl = payload.photoUrl;
      state.errorMessage = null; 

    }, 

    //Logout Reducer
    logout: ( state, action ) => {
      state.errorMessage = action.payload;
    },

    //Checking credentials
    checkingCredentials: ( state ) => {
      state.status = 'checking'
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions
