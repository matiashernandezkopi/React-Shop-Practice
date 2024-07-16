import React, { useState } from "react"
import "../customCSS/carritoMiniatura.css"
import { useDispatch } from 'react-redux';
import { CarritoList } from "./carritoList"
import { addVentas } from "../services/ventasdb"
import { cleanCarrito} from "../redux/userSlice"
import { updateRopaGuardada } from "../services/ropaDB";

interface LoggedUser{
    name:string,
    email:string,
    phone?:number
}
interface carritoMinitaturaProps{
    carritoArray:prendaCarrito[],
    LogedUser:LoggedUser|null
}


export const CarritoMiniatura: React.FC<carritoMinitaturaProps> = ({ carritoArray,LogedUser }) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    let amount:number = 0
    carritoArray.forEach(prenda => amount +=prenda.price)
    const dispatch = useDispatch();

    const name = LogedUser?.name || "Guest";
    const email = LogedUser?.email || "guest@example.com";
    const phone = LogedUser?.phone;
    
    const pay = ()=>{
        addVentas({name,email,phone,amount})
        updateRopaGuardada(carritoArray);
        dispatch(cleanCarrito());
    }

    return (
        <div className={` overflow-hidden flex justify-center items-center absolute right-6 bottom-3 bg-blue-900 border-4 border-white text-white transition-all duration-500 ease-in-out: ${expanded ? 'expanded' : 'collapsed'}`}>
            {expanded && (<>
                <CarritoList carritoArray={carritoArray}/>
                <div className="flex justify-between items-center absolute bottom-4 left-4">
                    <p>Subtotal: ${amount.toFixed(2)}</p>

                    {(LogedUser && amount > 0) && (<button onClick={pay} className="bg-blue-900 text-white pl-2 rounded-full">Pagar</button>)}
                </div>
            </>
              
            )}

            <button
                
                onClick={() => setExpanded(!expanded)}
                className="absolute bottom-6 right-4 transition-transform transform hover:scale-105"
            >
                <span role="img" aria-label="Carrito de compra" className="text-2xl">🛒</span>
            </button>
        </div>
    )
}