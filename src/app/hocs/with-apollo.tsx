import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { API_URL } from "shared/get-env";
import * as Auth from "features/auth";

/**
 * Инициализация API.baseUrl
 */
const httpLink = createHttpLink({
    uri: API_URL,
});

/**
 * Логика авторизации
 * FIXME: вынести в features/auth?
 */
const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = Auth.getToken();
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});

/**
 * Инициализация инстанса клиента
 * @see https://www.apollographql.com/docs/react/networking/authentication/
 */
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    // connectToDevTools: true,
});

/**
 * @hoc Инициализация подключения apollo для работы с API
 */
const withApollo = (component: Component) => () => (
    <ApolloProvider client={client}>{component()}</ApolloProvider>
);

export default withApollo;
