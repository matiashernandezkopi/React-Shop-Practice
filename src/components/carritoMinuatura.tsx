import React, { useState } from "react"
import "../customCSS/carritoMiniatura.css"


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
                <ul className={`  overflow-y-scroll h-72 w-72 absolute left-3 top-3 flex flex-col gap-2 transition-all duration-500 ease-in-out `}>
                    {carritoArray.map(prenda => ( 
                        <li key={prenda.id}>
                            <div className="shadow-md">
                                <img src={prenda.img} alt={prenda.name} className="w-16 h-16 overflow-hidden" />
                                <p>{prenda.name}</p>
                                <p>${prenda.price.toFixed(2)}</p>
                            </div>
                            
                        </li>
                        
                    ))}
                </ul>
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