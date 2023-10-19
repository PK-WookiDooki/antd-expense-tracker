import { createSlice } from "@reduxjs/toolkit";

export const layoutSlice = createSlice({
    name: "layout",
    initialState: {
        isSidebarOpen: false,
    },
    reducers: {
        toggleSideBar: (state, { payload }) => {
            state.isSidebarOpen = payload;
        },
    },
});

export const { toggleSideBar } = layoutSlice.actions;
export default layoutSlice.reducer;
