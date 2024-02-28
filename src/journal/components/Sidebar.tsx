import { MdOutlineTurnedInNot } from "react-icons/md";
import './styles';



export const Sidebar = () => {
  
    const months = ["Enero", "Febrero", "Marzo", "Abril"];
  
    return (
    <div className=" sidebar d-flex flex-column align-items-stretch flex-shrink-0 vh-100 shadow-sm">
        <div className="name-container d-flex align-items-center justify-content-center w-100 shadow-sm">
            <h1 className="fs-5 text-primary-color">Andre Ignorosa</h1>
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
  )
}
