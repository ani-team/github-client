import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { API_URL, ACCESS_TOKEN } from "shared/get-env";

const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
});

/**
 * Обертка для подключения и работы с API
 */
const withApollo = (component: () => React.ReactNode) => () => (
    <ApolloProvider client={client}>{component()}</ApolloProvider>
);

export default withApollo;
