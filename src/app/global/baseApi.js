import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.111:8080/api" }),
    tagTypes: ["auth", "records", "categories", "user"],
    endpoints: () => ({}),
});
