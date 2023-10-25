import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl: "https://needy-watch-production.up.railway.app/api",
        // baseUrl: "http://192.168.0.105:8080/api",
        baseUrl: "https://expense-tracker-nexcode.up.railway.app/api"
    }),
    tagTypes: ["auth", "records", "categories", "user"],
    endpoints: () => ({}),
});
