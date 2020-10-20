module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
        sourceType: "module",
    },
    env: {
        browser: true,
        es6: true,
    },
    plugins: [
        "react",
        "@typescript-eslint",
    ],
    extends: [
        "react-app",
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "prettier",
        "prettier/react",
    ],
    rules: {
    },
};
