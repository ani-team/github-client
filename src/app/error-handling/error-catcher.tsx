import React, { useEffect, useState, ReactNode } from "react";
import { ServerError, useApolloClient } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import { useLocation } from "react-router";
import { AppError } from "models";
import { ErrorDefinitions } from "./error-definitions";

const isGithubError = (error: any): error is { type: string } => {
    return typeof error.type === "string";
};

const isServerError = (error: any): error is ServerError => {
    return typeof error.statusCode === "number";
};

function mapError(error: GraphQLError | Error | ServerError | undefined): AppError | null {
    if (!error) return null;
    if (isGithubError(error)) {
        // FIXME: handle 403 and 500 errors as well w/o side effects
        if (error.type === "NOT_FOUND") {
            return ErrorDefinitions[error.type];
        }
    }
    if (isServerError(error)) {
        if (error.statusCode === 401) return ErrorDefinitions.UNAUTHORIZED;
    }
    // TODO: handle network errors and whatever can be broken
    return null;
}

type Props = PropsWithChildren<{
    handler: (props: { error: AppError }) => ReactNode;
}>;

const ErrorCatcher = ({ handler, children }: Props) => {
    const apolloClient = useApolloClient();
    const location = useLocation();
    const [error, setError] = useState<AppError | null>(null);

    useEffect(() => {
        const errorLink = onError(({ graphQLErrors, networkError }) => {
            setError(mapError(graphQLErrors?.[0] || networkError));
        });
        apolloClient.setLink(errorLink.concat(apolloClient.link));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => setError(null), [location]);

    if (error) {
        return <>{handler({ error })}</>;
    }
    return <>{children}</>;
};

export default ErrorCatcher;
