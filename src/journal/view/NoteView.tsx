import { IoSaveSharp } from "react-icons/io5"

export const NoteView = () => {
  return (

    <div className="w-100 h-100">
        <div className="d-flex justify-content-between align-items-center">
            <h2 className="text-primary-color">Enero 24, 2024</h2>
            <button className="icon btn fs-6 text-primary-color d-flex gap-2 justify-content-between align-items-center">
                <IoSaveSharp /> 
                <strong>GUARDAR</strong>
            </button>
        </div>
        <div className="mb-3">
            <input type="text" className="w-100" placeholder="Ingrese un título"/>
        </div>
        <div className="mb-3">
            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="¿Qué sucedió en el día de hoy?"></textarea>
        </div>
    </div>
  )
}
