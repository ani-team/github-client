module.exports = {
    client: {
        includes: ["**/*.gql"],
        excludes: ["node_modules/**/*", "src/models.ts"],
        service: {
            name: "github-api",
            url: "https://api.github.com/graphql",
            headers: {
                authorization: "Bearer d70d97689ae25f0eb61a1f49ee49fa4b9fc3c370",
            },
        },
    },
};
