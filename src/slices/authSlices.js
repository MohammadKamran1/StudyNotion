import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") || null,
}

const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        removeToken(state, actions) {
            state.token = null;
        }
    }
});

export const {setToken, removeToken} = authSlice.actions;
export default authSlice.reducer;