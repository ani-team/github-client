module.exports = {
    client: {
        includes: ["**/*.gql"],
        excludes: ["node_modules/**/*", "src/*.gen.ts"],
        service: {
            name: "github-api",
            url: "https://api.github.com/graphql",
            headers: {
                // !!! FIXME: hardcoded!
                authorization: "Bearer 284b8e0b1b4882b0b4a1fd6321f3136fcd309eac",
            },
        },
    },
};
