import { MdOutlineTurnedInNot } from "react-icons/md"
import './styles';

export const SidebarItem = ({item}) => {
  return (
    <li className="sidebar-item list-group-item d-flex py-4 border-bottom align-items-center gap-4">
        <div className="fs-4">
            <MdOutlineTurnedInNot />
        </div>
        <div>
            <h6 className="mb-2 d-inline-block d-flex flex-column">{ item }</h6>
            <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, sunt!</small>
        </div>
    </li>
  )
}
