import { UnknownAction } from "@reduxjs/toolkit";
import { ThunkAction } from "../auth";
import { RootState } from "../store";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, isSavingNote, setActiveNote, setNotes, setSaving, updateNote } from ".";
import { loadNotes } from "../../helpers";


interface NewAddedNote {
    id?: string; 
    title: string; 
    body: string; 
    imageUrls: string[];
    date: number; 
}

type ThunkActionType = ThunkAction<void, RootState, unknown, UnknownAction>; 

// Función para agregar una nueva nota
export const startNewNote = (): ThunkActionType => {
    return async( dispatch, getState ) => {

        dispatch( isSavingNote() );

        const { uid } = getState().auth;

        const newNote: NewAddedNote = {
            title: '', 
            body: '', 
            imageUrls: [],
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        await setDoc( newDoc, newNote );
        
        newNote.id = newDoc.id

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) )
    }


}


// Cargar las imágenes que del usuario 
export const startLoadingNotes = (): ThunkActionType => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        const notes = await loadNotes( uid )

        dispatch( setNotes( notes ) );

    }
}

//Guardar nota
export const startSavingNote = (): ThunkActionType => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        const { uid } = getState().auth;

        const { active: note } = getState().journal;
        
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note?.id}`); 
        
        await setDoc( docRef, noteToFirestore, { merge: true }); 
        
        dispatch( updateNote( note ) );
    }
}



// Borrar nota
export const startDeletingNoteById = (): ThunkActionType => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        const { active: note } = getState().journal; 

        // console.log(uid)

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note?.id}`); 

        await deleteDoc( docRef ); 

        dispatch( deleteNoteById( note?.id ) );

    }
}

/// Subir fotos a cloudinary
export const startUploadingFiles = ( files = [] ): ThunkActionType => {
    return async( dispatch ) => {

        dispatch( setSaving() ); 

        console.log( files );
    }
}