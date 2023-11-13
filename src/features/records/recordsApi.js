import {baseApi} from "@/app/global/baseApi";

const endPoint = "/transactions";

export const recordsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRecords: builder.query({
            query: ({startDate, endDate, token, keyword}) => ({
                url: `${endPoint}?startDate=${startDate}&endDate=${endDate}&filter=${keyword}`,
                method: "GET",
                headers: {authorization: `Bearer ${token}`},
            }),
            providesTags: ["records", "categories"],
        }),

        getAllExpenses: builder.query({
            query: ({selectedMonth, token}) => ({
                url: `${endPoint}?selectedMonth=${selectedMonth}`,
                method: "GET",
                headers: {authorization: `Bearer ${token}`},
            }),
            providesTags: ["records", "categories"],
        }),

        addNewRecord: builder.mutation({
            query: ({record, token}) => ({
                url: `${endPoint}`,
                method: "POST",
                headers: {authorization: `Bearer ${token}`},
                body: record,
            }),
            invalidatesTags: ["records"],
        }),

        updateRecord: builder.mutation({
            query: ({record, token, recordId}) => ({
                url: `${endPoint}/${recordId}`,
                method: "PUT",
                headers: {authorization: `Bearer ${token}`},
                body: record,
            }),
            invalidatesTags: ["records"],
        }),

        deleteRecord: builder.mutation({
            query: ({recordId, token}) => ({
                url: `${endPoint}/${recordId}`,
                method: "DELETE",
                headers: {authorization: `Bearer ${token}`},
            }),
            invalidatesTags: ["records"],
        }),

        getRecordById: builder.query({
            query: ({recordId, token}) => ({
                url: `${endPoint}/${recordId}`,
                method: "GET",
                headers: {authorization: `Bearer ${token}`},
            }),
            providesTags: ["records"],
        }),
    }),
});

export const {
    useGetAllRecordsQuery,
    useAddNewRecordMutation,
    useUpdateRecordMutation,
    useDeleteRecordMutation,
    useGetRecordByIdQuery,
    useGetAllExpensesQuery,
} = recordsApi;
