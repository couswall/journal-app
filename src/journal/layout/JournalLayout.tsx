import { FaPlus, FaRegStar } from "react-icons/fa"
import { Navbar, Sidebar } from "../components"

interface JournalInterface {
    children?: JSX.Element[] | JSX.Element
}


export const JournalLayout = ({ children }: JournalInterface ) => {
  return (
    <div className="container-fluid vh-100 p-0 position-relative" style={{backgroundColor: 'var(--light-color)'}}>
        
        {/* Navbar */}
        <Navbar/>
        
        <main className="main d-flex flex-row w-100">
            {/* Sidebar */}
            <Sidebar/>
            
            
            {/* Journal */}
            <div className="w-100 p-3">
                <div className=" w-100 h-100 bg-principal rounded d-flex flex-column justify-content-center align-items-center">
                    <div className="text-light-color mb-3" style={{fontSize: '50px'}}>
                      <FaRegStar />
                    </div>
                    <h2 className="text-center text-light-color">Selecciona o crea una entrada</h2>
                </div>

                {/* <div className="w-100 h-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <h2 className="text-primary-color">Enero 24, 2024</h2>
                      <button className="icon btn fs-6 text-primary-color d-flex gap-2 justify-content-between align-items-center">
                        <IoSaveSharp /> 
                        <strong>GUARDAR</strong>
                      </button>
                    </div>
                    <div className="mb-3">
                      <input type="text" className="w-100" placeholder="Ingrese un título"/>
                    </div>
                    <div className="mb-3">
                    <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="¿Qué sucedió en el día de hoy?"></textarea>
                    </div>
                </div> */}

                <button className="btn text-white position-absolute bg-main-red rounded-circle d-flex justify-content-center align-items-center" style={{ bottom:'40px', right:'30px', width:'60px', height:'60px', fontSize:'20px'}}>
                  <FaPlus />
                </button>
            </div>

            </main>


    { children }
    </div>
  )
}
