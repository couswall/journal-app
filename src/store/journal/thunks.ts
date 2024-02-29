import { UnknownAction } from "@reduxjs/toolkit";
import { ThunkAction } from "../auth";
import { RootState } from "../store";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, isSavingNote, setActiveNote } from ".";

interface newAddedNote {
    id?: string; 
    title: string; 
    body: string; 
    imageUrls: string[];
    date: number; 
}

// Función para agregar una nueva nota
export const startNewNote = (): ThunkAction<void, RootState, unknown, UnknownAction> => {
    return async( dispatch, getState ) => {

        dispatch( isSavingNote() );

        const { uid } = getState().auth;

        const newNote: newAddedNote = {
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