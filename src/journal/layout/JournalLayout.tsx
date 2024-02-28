import { FaPlus } from "react-icons/fa"
import { Navbar, Sidebar } from "../components"
import { NoteView, NothingSelectedView } from "../view"

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
                <NothingSelectedView/>
                
                {/* <NoteView/> */}

                <button className="btn text-white position-absolute bg-main-red rounded-circle d-flex justify-content-center align-items-center" style={{ bottom:'40px', right:'30px', width:'60px', height:'60px', fontSize:'20px'}}>
                  <FaPlus />
                </button>
            </div>

            </main>


    { children }
    </div>
  )
}
