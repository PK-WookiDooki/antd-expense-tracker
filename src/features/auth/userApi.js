import { baseApi } from "@/app/global/baseApi";

const endPoint = "/user";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserData: builder.query({
            query: (token) => ({
                url: `${endPoint}`,
                method: "GET",
                headers: { authorization: `Bearer ${token}` },
            }),
            providesTags: ["user", "records", "categories"],
        }),

        changeUsername: builder.mutation({
            query: ({ username, token }) => ({
                url: `${endPoint}/change-username`,
                method: "PUT",
                headers: { authorization: `Bearer ${token}` },
                body: { username },
            }),
            invalidatesTags: ["user"],
        }),

        changeEmail: builder.mutation({
            query: ({ userData, token }) => ({
                url: `${endPoint}/change-email`,
                method: "PUT",
                headers: { authorization: `Bearer ${token}` },
                body: userData,
            }),
            invalidatesTags: ["user"],
        }),

        changePassword: builder.mutation({
            query: ({ passwords, token }) => ({
                url: `${endPoint}/change-password`,
                method: "PUT",
                headers: { authorization: `Bearer ${token}` },
                body: passwords,
            }),
            invalidatesTags: ["user"],
        }),

        setBudget: builder.mutation({
            query: ({ budget, token }) => ({
                url: `${endPoint}/budget`,
                method: "PUT",
                headers: { authorization: `Bearer ${token}` },
                body: { budget },
            }),
            invalidatesTags: ["user", "records"],
        }),
    }),
});

export const {
    useGetUserDataQuery,
    useChangeUsernameMutation,
    useChangeEmailMutation,
    useChangePasswordMutation,
    useSetBudgetMutation,
} = authApi;
