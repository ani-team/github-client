/** Разрешенные импорты (с публичными API) */
const ALLOWED_PATH_GROUPS = ["shared", "shared/**", "pages", "features", "models"].map(
    (pattern) => ({
        pattern,
        group: "internal",
        position: "after",
    }),
);
/** Для запрета приватных путей */
const DENIED_PATH_GROUPS = [
    // Private imports are prohibited, use public imports instead
    "app/**",
    "pages/**",
    "features/**",
    "shared/*/**",
    "models.gen",
    // Prefer absolute imports instead of relatives (for root modules)
    "../**/app",
    "../**/pages",
    "../**/features",
    "../**/shared",
    "../**/models",
];

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
    plugins: ["react", "@typescript-eslint", "@graphql-eslint", "unicorn"],
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
        // imports
        "import/first": 2,
        "import/no-unresolved": 0,
        "import/order": [
            2,
            {
                pathGroups: ALLOWED_PATH_GROUPS,
                // TODO: Добавить сортировку `import "./index.scss";` (располагать внизу)
                // TODO: Добавить сортировку `import *** from "react"` (располагать вверху)
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            },
        ],
        // TODO: specify message: ("Please use allowed public API (not private imports!)")
        "no-restricted-imports": [2, { patterns: DENIED_PATH_GROUPS }],
        // variables
        "prefer-const": 2,
        "no-var": 2,
        // base
        "camelcase": [1, { ignoreDestructuring: true, ignoreImports: true, properties: "never" }],
        "no-else-return": 2,
        "max-len": [1, { code: 120 }],
        "dot-notation": 2,
        "eol-last": 2,
        // alert, console
        "no-alert": 2,
        "no-console": 0,
        // equals
        "eqeqeq": 1,
        "no-eq-null": 2,
        // function
        "max-params": [1, 2],
        "max-lines-per-function": [1, 48],
        "arrow-parens": [2, "always"],
        // plugin:unicorn
        "unicorn/no-for-loop": 2,
        "unicorn/no-abusive-eslint-disable": 2,
        "unicorn/no-array-instanceof": 2,
        "unicorn/no-zero-fractions": 2,
        "unicorn/prefer-includes": 2,
        "unicorn/prefer-text-content": 2,
        "unicorn/import-index": 2,
        "unicorn/throw-new-error": 2,
        // plugin:graphql
        "@graphql-eslint/no-anonymous-operations": 2,
    },
    overrides: [
        {
            files: ["*.gql"],
            parser: "@graphql-eslint/eslint-plugin",
            plugins: ["@graphql-eslint"],
            rules: {
                "prettier/prettier": 0,
                "max-len": 0,
            },
        },
    ],
};
