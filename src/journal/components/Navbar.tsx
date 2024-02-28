import { IoMdExit } from "react-icons/io"

import './styles';

export const Navbar = () => {
  return (
    <nav className="nav">
        <div className="container-fluid d-flex justify-content-between align-items-center mx-3">
        <h1 className="fs-5">JournalApp</h1>
        <button className="btn text-white fs-5">
            <IoMdExit />
        </button>
        </div>
    </nav>
  )
}
