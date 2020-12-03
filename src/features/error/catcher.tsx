import React, { useEffect, useState, ReactNode } from "react";
import { onError } from "@apollo/client/link/error";
import { useApolloClient } from "@apollo/client";
import { useLocation } from "react-router";
import { AppError } from "models";
import { Definitions } from "./definitions";
import { mapError } from "./helpers";

type Props = PropsWithChildren<{
    /** Отрисовщик-обработчик ошибки */
    handler: (props: { error: AppError }) => ReactNode;
    onNetworkError?: () => void;
}>;

/**
 * @hook Логика обработки и хранения ошибок
 */
const useAppError = () => {
    const apolloClient = useApolloClient();
    const [error, setError] = useState<AppError | null>(null);

    useEffect(() => {
        const errorLink = onError(({ graphQLErrors, networkError }) => {
            const appError = mapError(graphQLErrors?.[0] || networkError);
            setError(appError || null);
        });
        apolloClient.setLink(errorLink.concat(apolloClient.link));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { error, setError };
};

/**
 * @feature Обертка для обработки ошибок
 * FIXME: add ErrorBoundaries
 */
const Catcher = ({ handler, children, onNetworkError }: Props) => {
    const location = useLocation();
    const { error, setError } = useAppError();

    useEffect(() => setError(null), [location, setError]);
    useEffect(() => {
        if (error?.code !== Definitions.NETWORK_ERROR.code) return;
        onNetworkError?.();
    }, [error, onNetworkError]);

    if (error && error.code !== Definitions.NETWORK_ERROR.code) {
        return <>{handler({ error })}</>;
    }
    return <>{children}</>;
};

export default Catcher;
