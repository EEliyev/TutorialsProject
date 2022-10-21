import { createSlice } from "@reduxjs/toolkit";
import { cards } from "../data";


export const renderReducer= createSlice({
    name:"render",
    initialState:{
        render:null,
    },
    reducers:{
        setRender:(state,action)=>{
            state.render=action.payload
        }
        
    }
})

export const {setRender} = renderReducer.actions;
export default renderReducer.reducer;