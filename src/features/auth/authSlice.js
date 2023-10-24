import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token") ? Cookies.get("token") : null;

export const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        isLoggedIn: !!token,
        userData: null,
        token,
    },
    reducers: {
        setLoggedInStatus: (state, { payload }) => {
            state.userData = payload.userData;
            state.token = payload.token;
        },

        logoutAccount: (state, _) => {
            state.token = null;
            state.userData = null;
            Cookies.remove("token");
        },
    },
});

export const { setLoggedInStatus, logoutAccount } = authSlice.actions;
export default authSlice.reducer;
