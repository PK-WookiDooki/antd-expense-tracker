/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryGreen: "#00AA70",
                lightGreen: "#D9F3E1",
                pieBg: "#00AA703B",
                danger: "#F5222D",
                primaryBlue: "#1890FF",
                darkGray: "#003A8C",
                dark: "#262626",
                lightGray: "#595959",
                gray: "#D9D9D9",
                whiteGray: "#FAFAFA",
            },
        },
        fontFamily: {
            sans: ["Roboto", "sans-serif"],
            dms: ["DM Serif Display", "serif"],
            rbs: ["Roboto Slab", "serif"],
        },
    },
    plugins: [],
};
