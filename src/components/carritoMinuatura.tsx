import React, { useState } from "react"
import "../customCSS/carritoMiniatura.css"
import { CarritoList } from "./carritoList"


interface carritoMinitaturaProps{
    carritoArray:prendaCarrito[]
}


export const CarritoMiniatura: React.FC<carritoMinitaturaProps> = ({ carritoArray }) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    let total:number = 0
    carritoArray.forEach(prenda => total +=prenda.price)

    return (
        <div className={` overflow-hidden flex justify-center items-center absolute right-6 bottom-3 bg-blue-900 border-4 border-white text-white transition-all duration-500 ease-in-out: ${expanded ? 'expanded' : 'collapsed'}`}>
            {expanded && (<>
                <CarritoList carritoArray={carritoArray}/>
                <div className="flex justify-between items-center absolute bottom-4 left-4">
                    <p>Total: ${total.toFixed(2)}</p>
                    <button className="bg-blue-900 text-white p-2 rounded-full">Pagar</button>
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