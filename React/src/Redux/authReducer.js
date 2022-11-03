import { createSlice } from "@reduxjs/toolkit";
import { cards } from "../data";


export const authReducer= createSlice({
    name:"auth",
    initialState:{
        user:null,
        token:null,
        statusCode:null
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setToken:(state,action)=>{
            state.token=action.payload
        },
        setStatusCode:(state,action)=>{
            state.statusCode=action.payload
        }
        
    }
})

export const {setUser,setToken,setStatusCode} = authReducer.actions;
export default authReducer.reducer;