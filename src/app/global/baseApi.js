import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl: "https://d262-103-25-242-57.ngrok-free.app/api",
        // baseUrl: "http://192.168.0.105:8080/api",
        baseUrl: "https://expense-tracker-nexcode.up.railway.app/api"
    }),
    tagTypes: ["auth", "records", "categories", "user"],
    endpoints: () => ({}),
});
