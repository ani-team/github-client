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
                pathGroups: [
                    "shared",
                    "shared/**",
                    "pages",
                    "pages/**",
                    "features",
                    "features/**",
                    "models",
                ].map((pattern) => ({
                    pattern,
                    group: "internal",
                    position: "after",
                })),
                // TODO: Добавить сортировку `import "./index.scss";` (располагать внизу)
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            },
        ],
        "@graphql-eslint/no-anonymous-operations": 2,
        "max-lines-per-function": [1, 48],
        // TODO: specify message: ("Please use allowed public API (not private imports!)")
        "no-restricted-imports": [
            1,
            { patterns: ["app/**", "pages/**", "features/**", "shared/*/**"] },
        ],
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
