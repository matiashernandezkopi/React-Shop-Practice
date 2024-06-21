import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Prenda } from "../types/Prenda";




const initialState:prendaCarrito[]=[]

export const useSlice = createSlice({
    name: 'carritoArray',
    initialState,
    reducers: {
        addToCarrito: (state, action: PayloadAction<Prenda>) => {
            state.push(action.payload);
        },
        removeFromCarrito: (state, action) => {
            return state.filter(item => item.id !== action.payload);
        },
        cleanCarrito: () => {
            return initialState;
        }
    }
})

export const {addToCarrito, removeFromCarrito,cleanCarrito} = useSlice.actions
export default useSlice.reducer