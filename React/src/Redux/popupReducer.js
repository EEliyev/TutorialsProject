import { createSlice } from "@reduxjs/toolkit";
import { cards } from "../data";


export const popupReducer= createSlice({
    name:"pop",
    initialState:{
        popAddTuto:false,
        popEditTuto:false,
        popAddSection:false
    },
    reducers:{
        setPopAddTuto:(state,action)=>{
            state.popAddTuto=action.payload
        },
        setPopEditTuto:(state,action)=>{
            state.popEditTuto=action.payload;
        },
        setPopAddSection:(state,action)=>{
            state.popAddSection=action.payload
        }
        
    }
})

export const {setPopAddTuto,setPopEditTuto,setPopAddSection} = popupReducer.actions;
export default popupReducer.reducer;