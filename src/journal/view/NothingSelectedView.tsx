import { FaRegStar } from "react-icons/fa"

export const NothingSelectedView = () => {
  return (
    <div className=" w-100 h-100 bg-principal rounded d-flex flex-column justify-content-center align-items-center">
        <div className="text-light-color mb-3" style={{fontSize: '50px'}}>
            <FaRegStar />
        </div>
        <h2 className="text-center text-light-color">Selecciona o crea una entrada</h2>
    </div>
  )
}
