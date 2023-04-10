import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice.js";
import authSlice from "./authSlice.js";
import  transactionSlice  from "./transactionSlice.js";



export const store=configureStore({
    reducer: combineReducers({
        auth:authSlice,
        accounts:accountSlice,
        operations:transactionSlice
    })
})