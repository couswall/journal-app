import { Link } from "react-router-dom"
import { useForm } from "../../hooks"
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth";
import { AppDispatch } from "../../store";
import { FormLayout } from "../layout/FormLayout";

export const LoginPage = () => {

  const dispatch = useDispatch<AppDispatch>();

  const { email, password, onInputChange } = useForm({
    email: '',
    password: ''
  }); 


  //Submit Function
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    dispatch( checkingAuthentication( email, password ) );

  }

  //Google SignIn 
  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }
  

  return (
    <>

    <FormLayout onSubmitForm={ onSubmitForm }>
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
        <div className="d-flex justify-content-between gap-2 mb-3 mt-4">
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <button 
            type="submit" 
            className="btn btn-primary d-flex justify-content-center align-items-center w-100" 
            onClick={ () => onGoogleSignIn() }
          >
            <FaGoogle className="me-2" />
            Google
          </button>
        </div>
        <div className="d-flex justify-content-between">
          <label className="form-label text-dark" >¿No tienes cuenta?</label>
          <label className="form-label" >
            <Link to={'/auth/register'} className="text-dark">Registrate</Link>
          </label>
        </div>
    </FormLayout>
    </>
  )
}
