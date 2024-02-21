import { Link } from "react-router-dom"
import { useForm } from "../../hooks"

export const LoginPage = () => {

  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  }); 


  return (
    <>
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <form className="p-5 rounded" style={{backgroundColor: 'var(--secondary-color)'}}>
          <div className="mb-3 ">
            <label className="form-label text-dark fw-bold">Email address</label>
            <input 
              type="email" 
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              value={ email }
              onChange={ onInputChange }
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
            />
          </div>
          <div className="mb-3 d-flex justify-content-between">
            <label className="form-label text-dark" >¿No tienes cuenta?</label>
            <label className="form-label" >
              <Link to={'/auth/register'} className="text-dark">Registrate</Link>
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Login</button>
            <button type="submit" className="btn btn-primary">Google</button>
          </div>
        </form>
      </div>
    </>
  )
}
