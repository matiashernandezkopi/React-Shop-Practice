import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState:prendaCarrito[]=[]

const generateRandomId =(): string =>{
    return Math.random().toString(36).substr(2, 9); 
}

export const useSlice = createSlice({
    name: 'carritoArray',
    initialState,
    reducers: {
        addToCarrito: (state, action: PayloadAction<Prenda>) => {
            const newPrenda = { ...action.payload, id: generateRandomId() };
            state.push(newPrenda);
        },
        removeFromCarrito: (state, action) => {

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

            return state.filter(item => item.ip !== action.payload);
        },
        cleanCarrito: () => {
            return initialState;
        },
        updateAmount: (state, action: PayloadAction<{ ip: string; delta: number }>) => {
            const prenda = state.find(prenda => prenda.ip === action.payload.ip);
            if (prenda) {
                prenda.amount += action.payload.delta;
            }
        }
    }
})

export const {addToCarrito, removeFromCarrito,cleanCarrito,updateAmount} = useSlice.actions
export default useSlice.reducer