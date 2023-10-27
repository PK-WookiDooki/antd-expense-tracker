/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryGreen: "#00AA70",
                lightGreen: "#D9F3E1",
                primaryBlue: "#1890FF",
                danger: "#F5222D",
                pieBg: "#00AA703B",
                c3A: "#003A8C",
                c26: "#262626",
                c59: "#595959",
                cD9: "#D9D9D9",
                cFA: "#FAFAFA",
                cF0: "#F0F0F0",
                c8C: "#8C8C8C"
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
