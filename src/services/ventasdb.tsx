import { Ventas } from "../types/VentasDefinitions";

const key:string = "82uxjap53chst"

export const todaySetter = () => {
    const todaye = new Date();
    const formattedDate = todaye.toISOString().substring(0, 10);
    return formattedDate;
}

interface VentasData {
    name: string;
    phone?: number;
    email:string;
    amount?: number;
    date?: string;
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





export const addVentas = async ({name,phone,email,amount,date}:VentasData): Promise<Array<Ventas>> => {
    if (!date) {
        date = todaySetter()
    }

    if (!name) {
        name = "unknown";
    }

    if (!amount) {
        amount = 0;
    }

    if (!phone) {
        phone = 0;
    }

    
    const amountStr = amount.toFixed(2);
    const [integerPart, decimalPart] = amountStr.split('.');

    
    let formattedNumber = '';
    let count = 0;

    for (let i = integerPart.length - 1; i >= 0; i--) {
        count++;
        formattedNumber = integerPart.charAt(i) + formattedNumber;
        if (count % 3 === 0 && i !== 0) {
            formattedNumber = '.' + formattedNumber;
        }
    }

    
    
    
    const partes = date.split("-");
    const fixedDate =  `${partes[2]}/${partes[1]}/${partes[0]}`;
       
    
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
                        'email': email,
                        'amount': "$"+formattedNumber + ',' + decimalPart,
                        'date': fixedDate
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

        
        const updatedVentas = await getVentas();
        return updatedVentas;
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
        throw error; 
    }
}


export const updatedVentas = async (ventaid: number,data:string,value:string) => {
    
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

}