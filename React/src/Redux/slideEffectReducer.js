import { createSlice } from "@reduxjs/toolkit";
import { cards } from "../data";

export const slideEffect= createSlice({
    name:"slideEffect",
    initialState:{
        value:true
    },
    reducers:{
        setSlideEffect:(state,action)=>{
            state.value=action.payload
        },
    }
})

export const {setSlideEffect} = slideEffect.actions;
export default slideEffect.reducer;