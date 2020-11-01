import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { API_URL } from "shared/get-env";
import { TOKEN_KEY } from "shared/consts";

// TODO: Уточнить, нужно ли дополнительно задавать контекст

const httpLink = createHttpLink({
    uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(TOKEN_KEY);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    // connectToDevTools: true,
});

/**
 * Обертка для подключения и работы с API
 */
const withApollo = (component: () => React.ReactNode) => () => (
    <ApolloProvider client={client}>{component()}</ApolloProvider>
);

export default withApollo;
