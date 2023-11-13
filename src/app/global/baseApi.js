import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://192.168.0.105:8080/api",

        // railway api
        // baseUrl: "https://expense-tracker-nexcode.up.railway.app/api",

        // ngrok api
        baseUrl: "https://2ad6-103-25-242-29.ngrok-free.app/api",

        // only fo ngrok api
        prepareHeaders: (headers) => {
            // headers.set("Access-Control-Allow-Origin", "*");
            headers.set("ngrok-skip-browser-warning", "69420");
            return headers;
        },
    }),

    tagTypes: ["auth", "records", "categories", "user"],
    endpoints: () => ({}),
});
