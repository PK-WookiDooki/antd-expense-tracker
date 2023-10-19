import { createSlice } from "@reduxjs/toolkit";

const recordsList = [
    {
        id: 1,
        amount: 20000,
        type: "EXPENSE",
        userCategory: "food",
        description: "Lorem ipsum dolor sit amet consectetur.",
        createdDate: "2023-09-24",
    },
    {
        id: 2,
        amount: 10000,
        type: "EXPENSE",
        userCategory: "transportation",
        description: "Lorem ipsum dolor sit amet consectetur.",
        createdDate: "2023-09-25",
    },
    {
        id: 3,
        amount: 200000,
        type: "INCOME",
        userCategory: "salary",
        description: "Lorem ipsum dolor sit amet consectetur.",
        createdDate: "2023-09-29",
    },
    {
        id: 4,
        amount: 30000,
        type: "EXPENSE",
        userCategory: "clothings",
        description: "Lorem ipsum dolor sit amet consectetur.",
        createdDate: "2023-09-24",
    },
    {
        id: 5,
        amount: 20000,
        type: "INCOME",
        userCategory: "tips",
        description: "Lorem ipsum dolor sit amet consectetur.",
        createdDate: "2023-09-15",
    },
    {
        id: 6,
        amount: 30000,
        type: "EXPENSE",
        userCategory: "electric bill",
        description: "Lorem ipsum dolor sit amet consectetur.",
        createdDate: "2023-09-17",
    },
    {
        id: 7,
        amount: 45000,
        type: "INCOME",
        userCategory: "freelance",
        description: "Lorem ipsum dolor sit amet consectetur.",
        createdDate: "2023-09-24",
    },

    {
        id: 8,
        createdDate: "2023-09-04",
        amount: 2000,
        type: "EXPENSE",
        userCategory: "food",
        description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
        id: 9,
        createdDate: "2023-09-04",
        amount: 30000,
        type: "EXPENSE",
        userCategory: "Wifi bill",
        description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
        id: 10,
        amount: 200000,
        type: "INCOME",
        userCategory: "salary",
        description: "Lorem ipsum dolor sit amet consectetur.",
        createdDate: "2023-08-31",
    },
    {
        id: 11,
        createdDate: "2023-10-04",
        amount: 5000,
        type: "EXPENSE",
        userCategory: "phone bill",
        description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
        id: 12,
        createdDate: "2023-10-08",
        amount: 30000,
        type: "EXPENSE",
        userCategory: "Gas",
        description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
        id: 13,
        createdDate: "2023-10-08",
        amount: 2000,
        type: "EXPENSE",
        userCategory: "evening snack",
        description: "Lorem ipsum dolor sit amet consectetur.",
    },
    {
        id: 14,
        createdDate: "2023-10-07",
        amount: 5000,
        type: "EXPENSE",
        userCategory: "futsal",
        description: "Lorem ipsum dolor sit amet consectetur.",
    },
];

export const recordsSlice = createSlice({
    name: "recordsSlice",
    initialState: {
        isAddRecordModalOpen: false,
        recordsList,
    },
    reducers: {
        setIsAddRecordModalOpen: (state, { payload }) => {
            state.isAddRecordModalOpen = payload;
        },
    },
});

export const { setIsAddRecordModalOpen } = recordsSlice.actions;
export default recordsSlice.reducer;
