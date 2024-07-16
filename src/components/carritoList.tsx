import React from "react"
import { useDispatch } from "react-redux";
import { removeFromCarrito } from "../redux/userSlice";

interface carrtitoListProps{
    carritoArray:prendaCarrito[]
}

const generateRandomId =(): string =>{
    return Math.random().toString(36).substr(2, 9); 
}

export const CarritoList:React.FC<carrtitoListProps>=({ carritoArray })=>{
    const dispatch = useDispatch();

    const handleRemoveFromCarrito = (id: string) => {

        /**TODO 
         * el carrito necestia una actualizacion para podes agregar y eliminar multiples veces la misma prenda.
         * 
         * creo que podria hacer algo asi como removeFromCarrito(state, action: PayloadAction<{ ip: string; units: number }>)
         *  siendo units la cantidad de unidades agregadas. y que lo utilice para restarlo al carritoArray
         *  
         *  de paso mantiene el id cada prenda, y no hace falta agregar mas de una ves la misma
         * 
         * 
         * tambien: que se puedan comprar variables (ej:distintos colores) y que eso modifique el id (newID = id + idDelColor),
         * para poder eliminar o modificar la cantidad de unidades especifica de ese articulo, con esas cualidades
         * 
        */
       
        dispatch(removeFromCarrito(id));
    };

    return( 
    <ul className={`  overflow-y-scroll h-72 w-72 absolute left-3 top-3 flex flex-col gap-2 transition-all duration-500 ease-in-out `}>
        {carritoArray.map(prenda => ( 
        <li key={prenda.ip+generateRandomId()}>
            <div className="shadow-md">
                <img src={prenda.img} alt={prenda.name} className="w-16 h-16 overflow-hidden" />
                <p>{prenda.name}</p>
                <p>${prenda.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleRemoveFromCarrito(prenda.ip)}
              className="bg-red-500 text-white p-1 rounded hover:bg-red-700 transition-all"
            >
              Eliminar
            </button>
            
        </li>
        
        ))}
    </ul>)
}