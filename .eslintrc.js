module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["react", "@typescript-eslint"],
    rules: {},
    settings: {
        react: {
            version: "detect",
        },
    },
};