import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});
// Export actions 
export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 