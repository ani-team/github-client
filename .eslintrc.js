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
    plugins: ["react", "@typescript-eslint", "@graphql-eslint"],
    extends: [
        "react-app",
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
        "plugin:react/recommended",
        "prettier",
        "prettier/react",
    ],
    rules: {
        "import/first": 2,
        "import/no-unresolved": 0,
        "import/order": [
            2,
            {
                pathGroups: ["shared", "shared/**", "pages", "features", "features/**"].map(
                    (pattern) => ({
                        pattern,
                        group: "internal",
                        position: "after",
                    }),
                ),
                // TODO: Добавить сортировку `import "./index.scss";` (располагать внизу)
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            },
        ],
        "@graphql-eslint/no-anonymous-operations": 2,
    },
    overrides: [
        {
            files: ["*.gql"],
            parser: "@graphql-eslint/eslint-plugin",
            plugins: ["@graphql-eslint"],
            rules: {
                "prettier/prettier": 0,
            },
        },
    ],
};
