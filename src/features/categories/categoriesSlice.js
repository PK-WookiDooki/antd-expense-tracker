import { createSlice } from "@reduxjs/toolkit";

const categoriesList = [
    {
        id: 1,
        name: "food",
        iconName: "restaurant",
        type: "EXPENSE",
        iconBgColor: "#FF5733",
    },

    {
        id: 2,
        name: "Salary",
        iconName: "payments",
        type: "INCOME",
        iconBgColor: "#1DB954",
    },
    {
        id: 3,
        name: "Clothings",
        iconName: "laundry",
        type: "EXPENSE",
        iconBgColor: "#00A6ED",
    },
    {
        id: 4,
        name: "Transportation",
        iconName: "directions_car",
        type: "EXPENSE",
        iconBgColor: "#0077B6",
    },
    {
        id: 5,
        name: "Freelance",
        iconName: "monetization_on",
        type: "INCOME",
        iconBgColor: "#FFC300",
    },
    {
        id: 6,
        name: "Others",
        iconName: "help",
        iconBgColor: "#FF5733",
        type: null,
    },
];

const iconsList = [
    {
        value: "home",
        type: "EXPENSE",
        iconBgColor: "#531DAB",
    },
    {
        value: "shopping_bag",
        type: "EXPENSE",
        iconBgColor: "#08979C",
    },
    {
        value: "payments",
        type: "INCOME",
        iconBgColor: "#4DD64A",
    },
    {
        value: "heart_broken",
        type: "EXPENSE",
        iconBgColor: "#FA897B",
    },
    {
        value: "paid",
        type: "INCOME",
        iconBgColor: "#FA5E8D",
    },
    {
        value: "redeem",
        type: "INCOME",
        iconBgColor: "#FA16C8",
    },
    {
        value: "restaurant",
        type: "EXPENSE",
        iconBgColor: "#612500",
    },
    {
        value: "book_2",
        type: "EXPENSE",
        iconBgColor: "#D4B106",
    },
    {
        value: "laundry",
        type: "EXPENSE",
        iconBgColor: "#40A9FF",
    },
    {
        value: "directions_car",
        type: "EXPENSE",
        iconBgColor: "#0077B6",
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
