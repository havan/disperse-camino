module.exports = {
    purge: [],
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
