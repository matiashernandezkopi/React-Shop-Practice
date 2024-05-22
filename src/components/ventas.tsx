import React, { useEffect, useState } from "react";
import { addVentas, getVentas, todaySetter } from "../services/ventasdb";
import { Ventas } from "../types/VentasDefinitions";
import { VentasTable } from "./ventasTable";


const INITIAL_STATE:Ventas={
    name: '',
    phone: 0,
    email: '',
    amount: 0,
    date: todaySetter()
}

export const VentasList: React.FC = () => {

    const [ventas, setVentas] = useState<Ventas[]>([]);
    const [newVenta, setNewVenta] = useState<Ventas>(INITIAL_STATE);
    const [actualizar,setActualizar] = useState<boolean>(false)
    
    

    //getVentas
    useEffect(() => {
        const timer = setTimeout(() => {
            
            async function fetchVentas() {
                try {
                    const ventasData = await getVentas();
                    setVentas(ventasData);
                } catch (error) {
                    console.error('Error al obtener ventas:', error);
                }
            }
    
            fetchVentas();
        }, 700); 
    
        
        return () => clearTimeout(timer);
    }, [actualizar]);
    
    
    //addVentas
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addVentas(newVenta);

            const updatedVentas:Ventas[] = await getVentas();
            setVentas(updatedVentas);

            setNewVenta(INITIAL_STATE);
        } catch (error) {
            console.error('Error al agregar venta:', error);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;


        setNewVenta(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <div className="bg-blue-950 h-full w-full text-white font-medium p-6 pl-16  flex flex-col gap-2 ">
            <h1 className="text-3xl underline underline-offset-4">Ventas</h1>
            
            <form onSubmit={handleSubmit} className="flex  gap-2 text-black">
                <input type="text" name="name" value={newVenta.name} onChange={handleChange} placeholder="Nombre" />
                <input type="number" name="phone" value={newVenta.phone} onChange={handleChange} placeholder="Teléfono" />
                <input type="email" name="email" value={newVenta.email} onChange={handleChange} placeholder="example@mail.com"/>
                <input type="number" name="amount" value={newVenta.amount} onChange={handleChange} placeholder="Cantidad" />
                <input type="date" name="date" value={newVenta.date} onChange={handleChange} />
                <button type="submit" className="text-white">Agregar</button>
            </form>

            

            <VentasTable data={ventas} actualizar={actualizar} setActualizar={setActualizar}/>
            
        </div>
    );
}
