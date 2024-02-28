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
        
        {/* Main */}
        <main className="main d-flex flex-row w-100">
            {/* Sidebar */}
            <Sidebar/>
            
            
            {/* Journal */}
            <div className="w-100 p-3">
                
                <NothingSelectedView/>
                
                {/* <NoteView/> */}
            </div>

        </main>


    { children }
    </div>
  )
}
