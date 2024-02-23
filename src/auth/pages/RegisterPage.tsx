import { Link } from "react-router-dom"
import { FormLayout } from "../layout/FormLayout"
import { useForm } from "../../hooks"

const formData = {
  userName: 'Andre',
  email: 'andre@google.com',
  password: '123456'
}


export const RegisterPage = () => {
  
  const { userName, email, password, onInputChange } = useForm( formData );

  const onSubmitForm = ( e: React.FormEvent<HTMLFormElement> ) => {
      e.preventDefault();

  }

  return (
    <>
      <FormLayout onSubmitForm={ onSubmitForm }>
          <div className="mb-3 ">
            <label className="form-label text-dark fw-bold">Nombre</label>
            <input 
              type="text" 
              className="form-control"
              name="userName"
              value={ userName }
              onChange={ onInputChange }
              required
            />
          </div>

          <div className="mb-3 ">
            <label className="form-label text-dark fw-bold">Email address</label>
            <input 
              type="email" 
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              value={ email }
              onChange={ onInputChange }
              required
            />
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
          </div>
          {/* <div id="passwordHelpBlock" className="form-text">
            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
          </div> */}
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
