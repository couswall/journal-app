import { useSelector } from 'react-redux';
import { SidebarItem } from '.';
import './styles';
import { RootState } from '../../store';


export const Sidebar = () => {

    const { displayName } = useSelector( (state: RootState ) => state.auth );
    const { notes = [] } = useSelector( (state: RootState ) => state.journal );
    
    return (
    <div className="sidebar d-flex flex-column align-items-stretch flex-shrink-0 shadow-sm">
        <div className="name-container d-flex align-items-center justify-content-center w-100 shadow-sm">
            <h1 className="fs-5 text-primary-color">{ displayName }</h1>
        </div>

        <ul className="list-group list-group-flush border-bottom"> 
        {
            notes.map( (note) => (
                <SidebarItem key={ note.id } note = { note }/>
            ))
        }
        </ul>
    </div>
  )
}
