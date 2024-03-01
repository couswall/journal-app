import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

export interface NoteState {
    id: string; 
    title: string; 
    body: string; 
    date: Date; 
    imageUrls: string [];
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

    // Cambia el state de isSaving a true
    isSavingNote: ( state ) => { 
      state.isSaving = true; 
    },

    // Agregar una nueva nota
    addNewEmptyNote: ( state, action ) => {
      state.notes.push( action.payload );
      state.isSaving = false; 
    },
    
    // Establece la nota activa
    setActiveNote: ( state, action ) => {
      state.active = action.payload;
      state.messageSaved = "";
    },

    // Establece las notas del usuario
    setNotes: ( state, action ) => {
      state.notes = action.payload; 
    },

    // Cambia el estado de isSaving cuando una nota se haya guardado
    setSaving: ( state ) => {
      state.isSaving = true; 
      state.messageSaved = "";
    },

    // Actualiza una nota 
    updateNote: ( state, action ) => {
      state.isSaving = false; 
      state.notes = state.notes.map( note => {
        if ( note.id === action.payload.id ) {
            return action.payload; 
        }
        return note; 
      });
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },

    // ELimina una nota de acuerdo a su Id
    deleteNoteById: ( state, action ) => {

    }
   
  },
})

// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, isSavingNote } = journalSlice.actions