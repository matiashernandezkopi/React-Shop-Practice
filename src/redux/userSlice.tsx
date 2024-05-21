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
        }
    }
})

export const {addToCarrito, removeFromCarrito} = useSlice.actions
export default useSlice.reducer