module.exports = {
    printWidth: 100,
    tabWidth: 4,
    singleQuote: false,
    semi: true,
    trailingComma: "all",
    arrowParens: "always",
    quoteProps: "consistent",
    endOfLine: "auto",
    overrides: [
        {
            files: "*.{json,yml,md}",
            options: {
                tabWidth: 2,
            },
        },
        {
            files: "*.{ts,tsx}",
            options: {
                parser: "typescript",
            },
        },
    ],
};
