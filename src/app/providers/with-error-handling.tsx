import React, { lazy } from "react";
import { Error } from "widgets/error";
import { alert } from "shared/lib/browser";
import { AppError } from "models";

const ErrorPage = lazy(() => import("pages/error"));

/**
 * @hoc Инициализация отлова ошибок
 */
export const ErrorHandlingProvider = ({ children }: PropsWithChildren) => {
    const onNetworkError = ({ message, description }: AppError) => alert.warn(message, description);
    return (
        <Error.Catcher
            onNetworkError={onNetworkError}
            handler={({ error }) => <ErrorPage error={error} />}
        >
            {children}
        </Error.Catcher>
    );
};
