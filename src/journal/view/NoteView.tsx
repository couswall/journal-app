import { IoSaveSharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { AppDispatch, RootState } from "../../store";
import { useEffect, useMemo } from "react";
import { useForm } from "../../hooks";
import { setActiveNote, startSavingNote } from "../../store/journal";

export const NoteView = () => {
 
    const dispatch = useDispatch<AppDispatch>(); 
    const { active: note, isSaving, messageSaved } = useSelector( ( state: RootState ) => state.journal ); 
    const { title, body, date, onInputChange, formState } = useForm( note );
    
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
    
    return (

    <div className="w-100 h-100">
        <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-primary-color">{ dateString }</h2>
            <button 
                className="icon btn fs-6 text-primary-color d-flex gap-2 justify-content-between align-items-center"
                onClick={ () => onHandleSaveNote() }
                disabled = { isSaving }
            >
                
                <IoSaveSharp /> 
                <strong>GUARDAR</strong>
            </button>
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
    </div>
  )
}
