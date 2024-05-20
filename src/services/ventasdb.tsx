import { Ventas } from "../types/VentasDefinitions";

const key:string = "82uxjap53chst"


export const getToday = ():string=> {
    let today = todaySetter()
    today = dateFormater(today)
    return today;
}



export const todaySetter = () => {
    const todaye = new Date();
    
    
    const formattedDate = todaye.toISOString().substring(0, 10);
    return formattedDate;
}









interface VentasData {
    name: string;
    phone: number;
    amount: number;
    date: string;
}

export const getVentas = async (): Promise<Array<Ventas>> => {
    try {
        const response = await fetch(`https://sheetdb.io/api/v1/${key}?sort_by=id&sort_order=desc&limit=100&cast_numbers=age`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

const dateFormater = (date:string):string=>{
    const partes = date.split("-");
    const nuevaFecha = `${partes[2]}/${partes[1]}/${partes[0]}`;
    return nuevaFecha;
}



export const addVentas = async ({name,phone,amount,date}:VentasData): Promise<Array<Ventas>> => {
    
    if (!name) {
        name = "unknown";
    }
    
    date=dateFormater(date)
    
    
    try {
        const response = await fetch(`https://sheetdb.io/api/v1/${key}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        'id': "INCREMENT",
                        'name': name,
                        'phone': phone,
                        'amount': amount,
                        'date': date
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}





export const deleteVenta = async (ventaid: number) => {
    try {
        await fetch(`https://sheetdb.io/api/v1/${key}/id/${ventaid}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // Si la eliminación fue exitosa, busca las ventas actualizadas
        const updatedVentas = await getVentas();
        return updatedVentas;
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
        throw error; // Re-lanza el error para que sea manejado por quien llamó a deleteVenta
    }
}

/*necesito un onclick que tome el id, el dato a cambiar y el nuevo valor

    asi se lo doy a la funcion y hace el cambio
*/
export const updatedVentas = async (ventaid: number,data:string,value:string) => {
    console.log(data,"data",value,"value","updatedVentas");
    
    fetch(`https://sheetdb.io/api/v1/${key}/id/${ventaid}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: {
                [data]: value
            }
        })
    })
    .then((response) => response.json())
    .then((data) => console.log(data));

}