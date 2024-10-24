// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        accessToken: null
    },
    reducers: {
        logIn(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
        },
        logOut(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.accessToken = null;
        }
    }
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
