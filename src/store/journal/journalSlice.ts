import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface NoteState {
    id: string; 
    title: string; 
    body: string; 
    date: Date; 
}

export interface JournalState {
  isSaving: boolean;
  messageSaved: string; 
  notes: NoteState[]
  active: NoteState | null; 
}

const initialState: JournalState = {
    isSaving: false, 
    messageSaved: "",
    notes: [],
    active: null, 
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
   
  },
})

// Action creators are generated for each case reducer function
export const {  } = journalSlice.actions