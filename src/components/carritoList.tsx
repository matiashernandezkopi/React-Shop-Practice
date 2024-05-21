import React from "react"
import { useDispatch } from "react-redux";
import { removeFromCarrito } from "../redux/userSlice";

interface carrtitoListProps{
    carritoArray:prendaCarrito[]
}

export const CarritoList:React.FC<carrtitoListProps>=({ carritoArray })=>{
    const dispatch = useDispatch();

    const handleRemoveFromCarrito = (id: string) => {
        dispatch(removeFromCarrito(id));
    };


    return( 
    <ul className={`  overflow-y-scroll h-72 w-72 absolute left-3 top-3 flex flex-col gap-2 transition-all duration-500 ease-in-out `}>
        {carritoArray.map(prenda => ( 
        <li key={prenda.id}>
            <div className="shadow-md">
                <img src={prenda.img} alt={prenda.name} className="w-16 h-16 overflow-hidden" />
                <p>{prenda.name}</p>
                <p>${prenda.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleRemoveFromCarrito(prenda.id)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-700 transition-all"
            >
              Eliminar
            </button>
            
        </li>
        
        ))}
    </ul>)
}