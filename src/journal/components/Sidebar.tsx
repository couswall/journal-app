import { SidebarItem } from '.';
import './styles';


export const Sidebar = () => {
  
    const months = ["Enero", "Febrero", "Marzo", "Abril"];
  
    return (
    <div className="sidebar d-flex flex-column align-items-stretch flex-shrink-0 vh-100 shadow-sm">
        <div className="name-container d-flex align-items-center justify-content-center w-100 shadow-sm">
            <h1 className="fs-5 text-primary-color">Andre Ignorosa</h1>
        </div>

        <ul className="list-group list-group-flush border-bottom scrollarea ">
        {
            months.map( (month, index) => (
                <SidebarItem key={ index } item={ month }/>
            ))
        }
        </ul>
    </div>
  )
}
