import { configureStore } from "@reduxjs/toolkit";
import dataReduce from "./dataReduce";
import popupReducer from "./popupReducer";
import renderReducer from "./renderReducer";
import slideEffectReducer from "./slideEffectReducer";

export  const store = configureStore({
    reducer:{
        data:dataReduce,
        slideEffect:slideEffectReducer,
        pop:popupReducer,
        render:renderReducer
    }
});