import { FaPlus } from "react-icons/fa"
import { JournalLayout } from "../layout/JournalLayout"


export const JournalPage = () => {


  return (
    <>
        <JournalLayout>

        <button className="btn text-white position-absolute bg-main-red rounded-circle d-flex justify-content-center align-items-center" style={{ bottom:'40px', right:'30px', width:'60px', height:'60px', fontSize:'20px'}}>
          <FaPlus />
        </button>
        </JournalLayout>
    </>
  )
}
