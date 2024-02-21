import { useState } from "react"

export const useForm = <T extends Object> ( initialForm: T ) => {
    const [formState, setFormState] = useState<T>( initialForm );

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


    return{
        ...formState,
        formState, 
        onInputChange, 
        onResetForm
    }
}
