import React, { useEffect, useState } from "react";
import { addVentas, getVentas, todaySetter } from "../services/ventasdb";
import { Ventas } from "../types/VentasDefinitions";
import { VentasTable } from "./ventasTable";


const INITIAL_STATE:Ventas={
    name: '',
    email: 'example@mail.com',
    phone: 2284123456,
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
            
            <form onSubmit={handleSubmit} className="flex gap-2 text-black ">
                <div className=" flex flex-col">
                    <span className=" text-white">Nombre</span>
                    <input type="text" name="name" value={newVenta.name} onChange={handleChange} placeholder="Nombre" />
                </div>
                <div className=" flex flex-col">
                    <span className=" text-white">Telefono</span>
                    <input type="number" name="phone" value={newVenta.phone} onChange={handleChange} placeholder="Teléfono" />
                </div>
                <div className=" flex flex-col">
                    <span className=" text-white">Email</span>
                    <input type="email" name="email" value={newVenta.email} onChange={handleChange} placeholder="example@mail.com"/>
                </div>
                <div className=" flex flex-col">
                    <span className=" text-white">Cantidad</span>
                    <input type="number" name="amount" value={newVenta.amount} onChange={handleChange} placeholder="Cantidad" />
                </div>
                <div className=" flex flex-col">
                    <span className=" text-white">Fecha</span>
                    <input type="date" name="date" value={newVenta.date} onChange={handleChange} />
                </div>
                <button type="submit" className="text-white">Agregar</button>
            </form>

            

            <VentasTable data={ventas} actualizar={actualizar} setActualizar={setActualizar}/>
            
        </div>
    );
}
