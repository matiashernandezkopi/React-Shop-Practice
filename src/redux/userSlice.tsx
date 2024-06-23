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