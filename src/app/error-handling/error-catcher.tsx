import React, { useEffect, useState, ReactNode } from "react";
import { onError } from "@apollo/client/link/error";
import { useApolloClient } from "@apollo/client";
import { useLocation } from "react-router";
import { AppError } from "models";
import { mapError } from "./helpers";

type Props = PropsWithChildren<{
    /** Отрисовщик-обработчик ошибки */
    handler: (props: { error: AppError }) => ReactNode;
}>;

/**
 * @hook Логика обработки и хранения ошибок
 */
const useAppError = () => {
    const apolloClient = useApolloClient();
    const [error, setError] = useState<AppError | null>(null);

    useEffect(() => {
        const errorLink = onError(({ graphQLErrors, networkError }) => {
            setError(mapError(graphQLErrors?.[0] || networkError));
        });
        apolloClient.setLink(errorLink.concat(apolloClient.link));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { error, setError };
};

/**
 * Обертка для обработки ошибок
 * FIXME: add ErrorBoundaries
 */
const ErrorCatcher = ({ handler, children }: Props) => {
    const location = useLocation();
    const { error, setError } = useAppError();

    useEffect(() => setError(null), [location, setError]);

    if (error) {
        return <>{handler({ error })}</>;
    }
    return <>{children}</>;
};

export default ErrorCatcher;
