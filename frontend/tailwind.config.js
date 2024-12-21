module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class", // or 'media'
    theme: {
        extend: {},
    },
    variants: {
        opacity: ({ after }) => after(["disabled"]),
        cursor: ({ after }) => after(["disabled"]),
        extend: {},
    },
    plugins: [],
};
