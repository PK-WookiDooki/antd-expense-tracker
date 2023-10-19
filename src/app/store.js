import { configureStore } from "@reduxjs/toolkit";
import layoutSlice from "../layout/layoutSlice";
import authSlice from "../features/auth/authSlice";
import recordsSlice from "../features/records/recordsSlice";
import categoriesSlice from "../features/categories/categoriesSlice";
import globalSlice from "./global/globalSlice";
import { baseApi } from "./global/baseApi";

export const store = configureStore({
    reducer: {
        layout: layoutSlice,
        authSlice: authSlice,
        recordsSlice: recordsSlice,
        categoriesSlice: categoriesSlice,
        globalSlice: globalSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (gDM) => gDM().concat(baseApi.middleware),
});
