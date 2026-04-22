import { UnknownAction } from "@reduxjs/toolkit";
import { ThunkAction } from "../auth";
import { RootState } from "../store";
import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaveError, setSaving, updateNote } from ".";
import { fileUpload, loadNotes } from "../../helpers";


interface NewAddedNote {
    id?: string; 
    title: string; 
    body: string; 
    imageUrls: string[];
    date: number; 
}

type ThunkActionType = ThunkAction<void, RootState, unknown, UnknownAction>; 

// Función para agregar una nueva nota (solo abre el editor; la nota se guarda en Firestore al hacer clic en Save)
export const startNewNote = (): ThunkActionType => {
    return ( dispatch ) => {
        const newNote: NewAddedNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        };
        dispatch( setActiveNote( newNote ) );
    };
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

        try {
            const { uid } = getState().auth;
            const { active: note } = getState().journal;

            if ( !note ) return;

            const noteToFirestore = { title: note.title, body: note.body, imageUrls: note.imageUrls, date: note.date };

            if ( !note.id ) {
                // Nueva nota: crear documento en Firestore por primera vez
                const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
                await setDoc( newDoc, noteToFirestore );
                dispatch( updateNote( { ...note, id: newDoc.id } ) );
            } else {
                // Nota existente: actualizar documento en Firestore
                const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` );
                await setDoc( docRef, noteToFirestore, { merge: true } );
                dispatch( updateNote( note ) );
            }
        } catch {
            dispatch( setSaveError( 'Error al guardar la nota. Inténtalo de nuevo.' ) );
        }
    }
}



// Borrar nota
export const startDeletingNoteById = (): ThunkActionType => {
    return async ( dispatch, getState ) => {

        const { active: note } = getState().journal;

        if ( !note?.id ) {
            // Nota sin guardar: simplemente cerrar sin tocar Firestore
            dispatch( setActiveNote( null ) );
            return;
        }

        const { uid } = getState().auth;
        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}` );
        await deleteDoc( docRef );
        dispatch( deleteNoteById( note.id ) );
    }
}

/// Subir fotos a cloudinary
export const startUploadingFiles = ( files: ( File[] | null | FileList ) ): ThunkActionType => {
    return async( dispatch ) => {

        dispatch( setSaving() ); 

        const filesUploadPromises = [];

        for (const file of files!) {
            filesUploadPromises.push( fileUpload( file ) ); 
        }

        const filesUrl = await Promise.all( filesUploadPromises ); 

        dispatch( setPhotosToActiveNote( filesUrl ) ); 
    }
}