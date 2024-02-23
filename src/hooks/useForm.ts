import { useEffect, useState } from "react"
import { Validations } from "../auth/pages";


interface formCheckedValidation {
    [key: string ]: null | string; 
}

export const useForm = <T extends Record<string,string>> ( initialForm: T, formValidations: Validations = {} ) => {
    
    const [formState, setFormState] = useState<T>( initialForm );
    const [ formValidation, setFormValidation ] = useState<formCheckedValidation>({});

    const onInputChange = ( {target}: React.ChangeEvent<HTMLInputElement> ):void => {
        
        const { name, value } = target;
        setFormState({
            ...formState, 
            [name]: value
        })
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    useEffect( () => {
        createValidators();
    }, [formState]);


    //Validación de Formulario
    const createValidators = () => {
        
        const formCheckedValues: formCheckedValidation = {}; 

        for (const formField of Object.keys( formValidations )) {
            
            const [ fn, errorMessage = 'Este campo es requerido'] = formValidations[ formField ];

            formCheckedValues[`${ formField }Valid` ] = fn( formState[formField] ) ? null : errorMessage;

            setFormValidation( formCheckedValues );
        }
    }

    return{
        ...formState,
        formState, 
        onInputChange, 
        onResetForm,
        ...formValidation,
    }
}
