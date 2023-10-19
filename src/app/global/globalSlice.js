import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: "globalSlice",
    initialState: {
        message: {
            msgType: null,
            msgContent: null,
        },
        isSidebarOpen: false,
    },
    reducers: {
        setMessage: (state, { payload }) => {
            state.message = payload;
        },

        toggleSidebar: (state, { payload }) => {
            state.isSidebarOpen = payload;
        },
    },
});

export const { setMessage, toggleSidebar } = globalSlice.actions;
export default globalSlice.reducer;
