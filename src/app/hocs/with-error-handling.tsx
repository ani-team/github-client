import React, { lazy } from "react";
import { Error } from "features";

const ErrorPage = lazy(() => import("pages/error"));

/**
 * @hoc Инициализация отлова ошибок
 */
export const ErrorHandlingProvider = ({ children }: PropsWithChildren) => (
    <Error.Catcher handler={({ error }) => <ErrorPage error={error} />}>{children}</Error.Catcher>
);
