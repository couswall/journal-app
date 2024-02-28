import { FaPlus, FaRegStar } from "react-icons/fa"
import { IoMdExit } from "react-icons/io"
import { IoSaveSharp } from "react-icons/io5"
import { MdOutlineTurnedInNot } from "react-icons/md"

export const JournalPage = () => {

  const months = ["Enero", "Febrero", "Marzo", "Abril"]

  return (
    <>
        <div className="container-fluid vh-100 p-0" style={{backgroundColor: 'var(--light-color)'}}>

            {/* Navbar */}
            <nav className="nav" style={{backgroundColor: 'var(--background-color)', height:'60px', width:'calc(100% - 340px)', marginLeft:'340px'}}>
              <div className="container-fluid d-flex justify-content-between align-items-center mx-3">
                <h1 className="fs-5">JournalApp</h1>
                <button className="btn text-white fs-5">
                  <IoMdExit />
                </button>
              </div>
            </nav>


            <main className="main d-flex flex-row w-100">
              {/* Sidebar */}

            <div className="d-flex flex-column align-items-stretch flex-shrink-0 vh-100 shadow-sm" style={{width:'340px', marginTop:'-60px'}}>
              <div className="d-flex align-items-center justify-content-center w-100 shadow-sm" style={{height:'60px'}}>
                <h1 className="fs-5" style={{color:'var(--background-color)'}}>Andre Ignorosa</h1>
              </div>

              <ul className="list-group list-group-flush border-bottom scrollarea ">
                {
                  months.map( (month, index) => (
                    <li className="list-group-item d-flex py-4 border-bottom align-items-center gap-4" key={ index } style={{ backgroundColor:'var(--light-color)'}}>
                      <div className="fs-4">
                        <MdOutlineTurnedInNot />
                      </div>
                      <div>
                        <h6 className="mb-2 d-inline-block d-flex flex-column">{month}</h6>
                        <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, sunt!</small>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
            
            {/* Journal */}
            <div className="w-100 p-3 position-relative">
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

        </div>
    </>
  )
}
