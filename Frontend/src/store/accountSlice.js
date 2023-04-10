import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAccountsByUser = createAsyncThunk(

    'auth/getAccounts',
    async (token) => {
        try {
            const res = await fetch('https://budget-backend-railway-production.up.railway.app/get_accounts', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const responseJson = await res.json();
            console.log(responseJson);
            return { accounts: responseJson.accounts }

        } catch (error) {
            console.log(error);
            return { accounts: [] }
        }
    }
)


const initialState = {
    accounts: [],
}

export const accountSlice = createSlice({
    name: 'accounts',
    initialState: initialState,
    reducers: {
        getAccounts: (state, action) => {
            console.log(action);
            state.accounts = action.payload.accounts;

        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAccountsByUser.fulfilled,(state,action)=>{
            state.accounts = action.payload.accounts;
        })
    },
});

export const { getAccounts } = accountSlice.actions;
export default accountSlice.reducer;