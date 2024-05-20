import React, { useEffect, useState } from "react";

interface MouseFormProps {
    isOpen: boolean;
    onSubmit: (formData: string) => void;
    onClose: () => void;
    
    type:string;
    actualCellValue:string;
}


function convertirFormatoFecha(fecha: string): string {
    // Divide la cadena de fecha en día, mes y año
    const [dia, mes, año] = fecha.split('/');

    // Crea una nueva cadena de fecha en el formato "yyyy/mm/dd"
    const nuevaFecha = `${año}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;

    // Devuelve la nueva cadena de fecha
    return nuevaFecha;
}

export const MouseForm: React.FC<MouseFormProps> = ({ isOpen, onSubmit, onClose,  type, actualCellValue }) => {
    const [formData, setFormData] = useState(actualCellValue); // Convertir a cadena de texto

    console.log(actualCellValue);

    
    useEffect(()=>{setFormData(actualCellValue.toString())},[isOpen])

    if(type==="date"&&actualCellValue.includes("/")){
        actualCellValue=convertirFormatoFecha(actualCellValue); 
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const inputType = () => {
        if (type === "name") {
            return "text";
        }
        if (type === "date") {
            return "date";
        }
        return "number";
    };

    return (
        isOpen && (
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50" >
                <div className="bg-white p-4 shadow-md rounded-lg" >
                    <form onSubmit={handleSubmit}>
                        <input
                            type={inputType()}
                            value={formData}
                            onChange={(e) => setFormData(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mb-2 w-full text-black"
                            
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </form>
                    <button onClick={onClose} className="mt-2 text-gray-600 hover:text-gray-800">
                        Close
                    </button>
                </div>
            </div>
        )
    );
};
