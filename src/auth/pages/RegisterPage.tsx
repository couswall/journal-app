import { Link } from "react-router-dom"
import { FormLayout } from "../layout/FormLayout"

export const RegisterPage = () => {
  return (
    <>
      <FormLayout>
          <div className="mb-3 ">
            <label className="form-label text-dark fw-bold">Nombre</label>
            <input 
              type="text" 
              className="form-control"
              aria-describedby="emailHelp"
              // name="email"
              // value={ email }
              // onChange={ onInputChange }
            />
          </div>

          <div className="mb-3 ">
            <label className="form-label text-dark fw-bold">Email address</label>
            <input 
              type="email" 
              className="form-control"
              aria-describedby="emailHelp"
              // name="email"
              // value={ email }
              // onChange={ onInputChange }
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-dark fw-bold">Password</label>
            <input 
              type="password" 
              className="form-control" 
              // name="password"
              // value={ password }
              // onChange={ onInputChange }
            />
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
