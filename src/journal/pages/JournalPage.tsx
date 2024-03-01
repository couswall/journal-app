import { FaPlus } from "react-icons/fa"
import { JournalLayout } from "../layout/JournalLayout"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store"
import { startNewNote } from "../../store/journal"


export const JournalPage = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { isSaving } = useSelector( ( state: RootState ) => state.journal );

  const onCreateNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <>
        <JournalLayout>

        <button 
          className="add-note-btn btn text-white position-absolute bg-main-red rounded-circle d-flex justify-content-center align-items-center" 
          style={{ bottom:'40px', right:'30px', width:'60px', height:'60px', fontSize:'20px'}}
          onClick={() => onCreateNewNote()}
          disabled = { isSaving }
        >
          
          <FaPlus />
        </button>
        </JournalLayout>
    </>
  )
}
