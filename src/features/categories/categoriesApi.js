import {baseApi} from "@/app/global/baseApi";

const endPoint = "/user-categories";

export const categoriesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query({
            query: (token) => ({
                url: `${endPoint}`,
                method: "GET",
                headers: {Authorization: `Bearer ${token}`},
            }),
            providesTags: ["categories"],
        }),

        addNewCategory: builder.mutation({
            query: ({category, token}) => ({
                url: `${endPoint}`,
                method: "POST",
                headers: {Authorization: `Bearer ${token}`},
                body: category,
            }),
            invalidatesTags: ["categories"],
        }),

        updateCategory: builder.mutation({
            query: ({categoryId, category, token}) => ({
                url: `${endPoint}/${categoryId}`,
                method: "PUT",
                headers: {Authorization: `Bearer ${token}`},
                body: category,
            }),
            invalidatesTags: ["categories", "records"],
        }),

        deleteCategory: builder.mutation({
            query: ({categoryId, token}) => ({
                url: `${endPoint}/${categoryId}`,
                method: "DELETE",
                headers: {Authorization: `Bearer ${token}`},
            }),
            invalidatesTags: ["categories", "records"],
        }),

        getCategoryById: builder.query({
            query: ({categoryId, token}) => ({
                url: `${endPoint}/${categoryId}`,
                method: "GET",
                headers: {Authorization: `Bearer ${token}`},
            }),
            providesTags: ["categories"],
        }),

        //icons
        getAllIcons: builder.query({
            query: (token) => ({
                url: `icons`,
                method: "GET",
                headers: {Authorization: `Bearer ${token}`},
            }),
            providesTags: ["categories"],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useAddNewCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoryByIdQuery,
    useGetAllIconsQuery,
} = categoriesApi;
