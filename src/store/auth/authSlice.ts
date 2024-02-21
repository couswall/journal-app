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
    status: 'checking',  // 'checking', 'authenticated', 'not-authenticated'
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
    login: ( state, action ) => {

    }, 

    //Logout Reducer
    logout: ( state, action ) => {

    },

    //Checking credentials
    checkingCredentials: ( state ) => {

    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions
