import { MdOutlineTurnedInNot } from "react-icons/md"
import './styles';
import { NoteState } from "../../store/journal";


interface SidebarItemProps{
  note: NoteState
}

export const SidebarItem = ({ note }: SidebarItemProps) => {
  return (
    <li className="sidebar-item list-group-item d-flex py-4 border-bottom align-items-center gap-4">
        <div className="fs-4">
            <MdOutlineTurnedInNot />
        </div>
        <div>
            <h6 className="mb-2 d-inline-block d-flex flex-column">{ note.title }</h6>
            <small>{ note.body }</small>
        </div>
    </li>
  )
}
