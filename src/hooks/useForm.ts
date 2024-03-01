import { useEffect, useMemo, useState } from "react"
import { Validations } from "../auth/pages";


interface FormCheckedValidation {
    [key: string ]: null | string; 
}

type InputTarget = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export const useForm = <T extends Record<string,string>> ( 
    initialForm: T, 
    formValidations: Validations = {} 
    ) => {
    
    const [formState, setFormState] = useState<T>( initialForm );
    const [ formValidation, setFormValidation ] = useState<FormCheckedValidation>({});

    //onInputChange
    const onInputChange = ( {target}: InputTarget ):void => {

        const { name, value } = target;
        setFormState({
            ...formState, 
            [name]: value
        })
    }

    // Reset Form
    const onResetForm = () => {
        setFormState( initialForm );
    }

    // Evalua si el formulario es válido
    const isValid:boolean | undefined = useMemo(() => {

        for (const formValid of Object.keys( formValidation )) {
            
            if ( formValidation[formValid] !== null ) return false; 

            return true; 
        }

    }, [ formValidation ]);


    useEffect( () => {
        createValidators();
    }, [formState]);


    //Validación de Formulario
    const createValidators = () => {
        
        const formCheckedValues: FormCheckedValidation = {}; 

        for (const formField of Object.keys( formValidations )) {
            
            const [ fn, errorMessage = 'Este campo es requerido'] = formValidations[ formField ];
        
            formCheckedValues[`${ formField }Valid` ] = fn( formState[formField] ) ? null : errorMessage;
        }
        
        setFormValidation( formCheckedValues );
    }

    

    return{
        ...formState,
        formState, 
        onInputChange, 
        onResetForm,
        formValidation, 
        isValid
    }
}
