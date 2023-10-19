import { createSlice } from "@reduxjs/toolkit";

const categoriesList = [
    {
        id: 1,
        categoryName: "food",
        icon: "restaurant",
        type: "EXPENSE",
        color: "#FF5733",
    },
    {
        id: 2,
        categoryName: "Salary",
        icon: "payments",
        type: "INCOME",
        color: "#1DB954",
    },
    {
        id: 3,
        categoryName: "Clothings",
        icon: "laundry",
        type: "EXPENSE",
        color: "#00A6ED",
    },
    {
        id: 4,
        categoryName: "Transportation",
        icon: "directions_car",
        type: "EXPENSE",
        color: "#0077B6",
    },
    {
        id: 5,
        categoryName: "Freelance",
        icon: "monetization_on",
        type: "INCOME",
        color: "#FFC300",
    },
];

const iconsList = [
    {
        value: "home",
        type: "EXPENSE",
        color: "#531DAB",
    },
    {
        value: "shopping_bag",
        type: "EXPENSE",
        color: "#08979C",
    },
    {
        value: "payments",
        type: "INCOME",
        color: "#4DD64A",
    },
    {
        value: "heart_broken",
        type: "EXPENSE",
        color: "#FA897B",
    },
    {
        value: "paid",
        type: "INCOME",
        color: "#FA5E8D",
    },
    {
        value: "redeem",
        type: "INCOME",
        color: "#FA16C8",
    },
    {
        value: "restaurant",
        type: "EXPENSE",
        color: "#612500",
    },
    {
        value: "book_2",
        type: "EXPENSE",
        color: "#D4B106",
    },
    {
        value: "laundry",
        type: "EXPENSE",
        color: "#40A9FF",
    },
    {
        value: "directions_car",
        type: "EXPENSE",
        color: "#0077B6",
    },
];

export const categoriesSlice = createSlice({
    name: "categoriesSlice",
    initialState: {
        categoriesList,
        iconsList,
    },
    reducers: {},
});

export default categoriesSlice.reducer;
