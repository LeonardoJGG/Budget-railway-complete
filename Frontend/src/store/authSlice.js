import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('authToken');

const initialState = {
    isAuth: false,
    token: token ? token : null,
    user: {email: null, name: null}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        signIn: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuth = true;
        },
        logOut: (state, action) => {
            localStorage.removeItem('authToken')
            state.isAuth = false;
            state.token = null;
            state.user = {email: null, name: null}
        }
    },
});

export const { signIn, logOut } = authSlice.actions;
export default authSlice.reducer;