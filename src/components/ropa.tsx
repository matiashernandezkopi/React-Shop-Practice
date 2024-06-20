import React from "react";
import { Prenda } from "../types/Prenda";
import { ropaGuardada } from '../services/ropaDB';
import { useDispatch, useSelector } from "react-redux";
import { addToCarrito } from "../redux/userSlice";


  
interface RopaProps {
    prenda: Prenda;
}

interface RootState{
    carritoArray:Prenda[]
}


export const Ropa: React.FC<RopaProps> = ({ prenda }) => {
    const carritoArray = useSelector((state:RootState) => state.carritoArray);
    const dispatch = useDispatch();

    const handleAddToCarrito = () => {
        console.log("click add carito");
        
        dispatch(addToCarrito(prenda));
        console.log(carritoArray);
        
    };


    return (
        <div key={prenda.id} className='  sm:h-1/2 p-2 w-72 rounded-md bg-cyan-600  text-center flex flex-col items-center justify-between gap-4 sm:gap-2 shadow-xl hover:-translate-y-1.5  transition-all'>
            <h3 className=' sm:text-3x1 text-blue-200 text-2xl font-bold sm:h-16 flex items-center justify-center'>{prenda.name}</h3>
            <img className='w-64 rounded-md' src={prenda.img} alt={prenda.name} />
            <p className='text-white bg-blue-900 rounded-md w-11/12'>{prenda.description}</p>
            
            <div className='flex justify-between w-11/12 font-medium'>
                <p className='text-white h-7'>Stock: {prenda.amount}</p>
                <button onClick={handleAddToCarrito} className=' cursor-pointer text-white bg-blue-900 rounded-full border-2 border-white hover:-translate-y-0.5  transition-all hover:border-blue-900 hover:bg-white hover:text-blue-900 w-28 h-7'>${prenda.price.toFixed(2)}</button>
            </div>
        </div>
    );
};


export const ListaDeRopa: React.FC = () => {
    const listaDelista = ropaGuardada
    
    return (
        <div className='flex flex-wrap justify-around p-6 gap-2 bg-blue-950 h-full w-full overflow-x-hidden'>
            {listaDelista.length > 0 ? (
                listaDelista.map((prenda: Prenda) => (
                    <Ropa key={prenda.id} prenda={prenda} />
                ))
            ) : (
                <p className='text-white'>No se encontraron prendas</p>
            )}
        </div>
    );
};
