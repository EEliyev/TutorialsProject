import { createSlice } from "@reduxjs/toolkit";
import { cards } from "../data";


export const dataReduce= createSlice({
    name:"data",
    initialState:{
        data:[],
        subjects:[]
    },
    reducers:{
        setData:(state,action)=>{
            state.data=action.payload
        },
        addData:(state,action)=>{
            state.data.push(action.payload)
        },
        setSubject:(state,action)=>{
            state.subjects=action.payload?action.payload:[];
        }
      
        
    }
})

export const {setData,addData,setSubject} = dataReduce.actions;
export default dataReduce.reducer;