import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getHistoryByUser = createAsyncThunk(

    'auth/getTransactions',
    async (token) => {
        try {
            const res = await fetch('https://budget-backend-railway-production.up.railway.app/get_history', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const responseJson = await res.json();
            return { operations: responseJson.operations }

        } catch (error) {
            console.log(error);
            return { operations: [] }
        }
    }
)

const initialState = {
    operations: [],
}

export const operationSlice = createSlice({
    name: 'operations',
    initialState: initialState,
    reducers: {
        getOperations: (state, action) => {
            console.log(action);
            state.operations = action.payload.operations;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getHistoryByUser.fulfilled,(state,action)=>{
            state.operations = action.payload.operations;
        })
    },
});

export const { getOperations } = operationSlice.actions;
export default operationSlice.reducer;