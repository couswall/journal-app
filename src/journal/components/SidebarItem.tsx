import { MdOutlineTurnedInNot } from "react-icons/md"
import './styles';
import { useMemo } from "react";


interface SidebarItemProps{
  title?: string; 
  body?: string; 
}

export const SidebarItem = ({ title = '', body }: SidebarItemProps) => {

  const newTitle = useMemo( () => {
      return title.length > 17 
        ? title.substring(0, 17) + '...'
        : title; 
  }, [ title ]);

  return (
    <li className="sidebar-item list-group-item d-flex py-4 border-bottom align-items-center gap-4">
        <div className="fs-4">
            <MdOutlineTurnedInNot />
        </div>
        <div>
            <h6 className="mb-2 d-inline-block d-flex flex-column">{ newTitle }</h6>
            <small>{ body }</small>
        </div>
    </li>
  )
}
