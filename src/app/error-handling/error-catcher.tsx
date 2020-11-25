import React, { useEffect, useState, ReactNode } from "react";
import { useApolloClient } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import { useLocation } from "react-router";
import { AppError } from "models";
import { ErrorDefinitions } from "./error-definitions";

const isGithubError = (error: any): error is { type: string } => {
    return typeof error.type === "string";
};

function mapError(error: GraphQLError | Error | undefined): AppError | null {
    if (!error) return null;
    if (isGithubError(error)) {
        // FIXME: handle 403 and 500 errors as well w/o side effects
        if (error.type === "NOT_FOUND") {
            return ErrorDefinitions[error.type];
        }
    }
    // TODO: handle network errors and whatever can be broken
    return null;
}

type Props = PropsWithChildren<{
    handler: (props: { error: AppError }) => ReactNode;
}>;

export default function ErrorCatcher({ handler, children }: Props) {
    const apolloClient = useApolloClient();
    const location = useLocation();
    const [error, setError] = useState<AppError | null>(null);

    useEffect(() => {
        const errorLink = onError(({ graphQLErrors, networkError }) => {
            setError(mapError(graphQLErrors?.[0] || networkError));
        });
        apolloClient.setLink(errorLink.concat(apolloClient.link));
    }, [apolloClient]);

    useEffect(() => setError(null), [location]);

    if (error) {
        return <>{handler({ error })}</>;
    }
    return <>{children}</>;
}
