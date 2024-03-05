import { IoSaveSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { AppDispatch, RootState } from "../../store";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "../../hooks";
import { setActiveNote, startDeletingNoteById, startSavingNote } from "../../store/journal";
import { FaUpload } from "react-icons/fa";

export const NoteView = () => {
 
    const dispatch = useDispatch<AppDispatch>(); 
    const { active: note, isSaving, messageSaved } = useSelector( ( state: RootState ) => state.journal ); 
    const { title, body, date, onInputChange, formState } = useForm( note );

    const fileInputRef = useRef<HTMLInputElement>(null); 
    
    const dateString = useMemo( () => {
        const newDate = new Date( date );

        return newDate.toUTCString();
    
    },[ date ] );

    //Actualiza la nota activa en el store cuando modificamos los valores de los input
    useEffect(  () => {
        dispatch( setActiveNote( formState ) );
    }, [ formState ]); 

    
    //Muestra la alerta de que se guardo exitosamente la nota
    useEffect( () => {

        if ( messageSaved.length > 0 ) {
            Swal.fire('Nota actualizada', messageSaved, 'success');
        }

    }, [ messageSaved])

    // Guarda la nota
    const onHandleSaveNote = () => {
        if( title.length <= 1 ) return; 
        dispatch( startSavingNote() ); 
    }



    // Elimina la nota 
    const onDeleteNote = () => {

        Swal.fire({
            title: '¿Deseas eliminar la nota?',
            text: 'Está acción no podrá revertir', 
            icon: 'warning', 
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
        }).then( (result) => {
            if ( result.isConfirmed ) {
                dispatch( startDeletingNoteById() ); 
                Swal.fire({
                    title: "Eliminada",
                    text: "Nota eliminada",
                    icon: "success"
                  });
            }
        })

        
    }
    
    return (

    <div className="w-100 h-100">
        <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-primary-color fs-3">{ dateString }</h2>
            <div className="buttons-container d-flex">
                <input 
                    type="file" 
                    style={{ display: 'none'}} 
                    ref={ fileInputRef }
                />
                <button 
                    className="icon btn fs-6 text-primary-color d-flex gap-2 justify-content-between align-items-center"
                    onClick={ () => fileInputRef.current?.click()}
                >
                    <FaUpload />
                    <strong>Add Images</strong>
                </button>
                <button 
                    className="icon btn fs-6 text-primary-color d-flex gap-2 justify-content-between align-items-center"
                    onClick={ () => onHandleSaveNote() }
                    disabled = { isSaving }
                >
                    
                    <IoSaveSharp /> 
                    <strong>Guardar</strong>
                </button>
            </div>
        </div>
        <div className="mb-3">
            <input 
                type="text" 
                className="w-100" 
                placeholder="Ingrese un título"
                name= "title"
                value={ title }
                onChange={ onInputChange }
            />
        </div>
        <div className="mb-3">
            <textarea 
                className="form-control" 
                id="exampleFormControlTextarea1" 
                placeholder="¿Qué sucedió en el día de hoy?"
                name= "body"
                value={ body }
                onChange={ onInputChange }
            >
            </textarea>
        </div>

       
            <button className="btn btn-danger ml-auto" onClick={ onDeleteNote }>Eliminar</button>
        

    </div>
  )
}
