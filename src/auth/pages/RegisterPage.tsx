import { Link } from "react-router-dom"
import { FormLayout } from "../layout/FormLayout"
import { useForm } from "../../hooks"
import { useState } from "react";


export interface Validations{
  [key: string ]: [( value: string ) => boolean, string ];
}

const formData = {
  displayName: '',
  email: '',
  password: ''
}

const formValidations: Validations = {
  displayName: [( value: string ) => value.length >= 1, 'El nombre es obligatorio'],
  email: [( value: string ) => value.includes('@'), 'El correo debe de tener un @'],
  password: [( value: string ) => value.length >= 6, 'El password debe de tener más de 6 letras'],
}


export const RegisterPage = () => {
  
  const { displayName, email, password, onInputChange, 
          formValidation: { displayNameValid, emailValid, passwordValid },
          isValid
    } = useForm( formData, formValidations );

    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const onSubmitForm = ( e: React.FormEvent<HTMLFormElement> ) => {
      e.preventDefault();
      setFormSubmitted( true );

      if( !isValid ) return; 
      
  }


  return (
    <>
      <FormLayout onSubmitForm={ onSubmitForm }>
          <div className="mb-3 ">
            <label className="form-label text-dark fw-bold">Nombre</label>
            <input 
              type="text" 
              className="form-control"
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              required
            />
            <>{( !!displayNameValid && formSubmitted ) && <small id="displayNameHelpBlock" className="form-text">{displayNameValid}</small>}</>
          </div>

          <div className="mb-3 ">
            <label className="form-label text-dark fw-bold">Email address</label>
            <input 
              type="email" 
              className="form-control"
              name="email"
              value={ email }
              onChange={ onInputChange }
              required
            />
             <>{( !!emailValid && formSubmitted ) && <small id="emailHelpBlock" className="form-text">{emailValid}</small>}</>
          </div>
          <div className="mb-3">
            <label className="form-label text-dark fw-bold">Password</label>
            <input 
              type="password" 
              className="form-control" 
              name="password"
              value={ password }
              onChange={ onInputChange }
              required
            />
            <>{ ( !!passwordValid && formSubmitted ) && <div id="passwordHelpBlock" className="form-text">{passwordValid}</div> } </>
          </div>
          <div className="d-flex justify-content-between gap-2 mb-3 mt-4">
            <button type="submit" className="btn btn-primary w-100">Crear cuenta</button>
          </div>
          <div className="d-flex justify-content-between">
            <label className="form-label text-dark" >¿Ya tienes cuenta?</label>
            <label className="form-label" >
              <Link to={'/auth/login'} className="text-dark">Ingresar</Link>
            </label>
          </div>
      </FormLayout>
    </>
  )
}
