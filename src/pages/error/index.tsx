import React from "react";
import { Auth, Error, HeroSheet } from "widgets";
import { AppError } from "models";
import { useTitle } from "../helpers";

type Props = {
    /** Приходящая ошибка от обработчика */
    error: AppError;
};

/**
 * @hook Обработка приходящих ошибок приложения
 * @remark
 * - Генерирует предлагаемые пользователю действия, в зависимости от ошибки
 * - На данный момент - уникально только для `401 - UNAUTHORIZED`
 */
const useAppErrors = (error: AppError) => {
    const { logout } = Auth.useAuth();
    const unauthorizedAction = {
        text: "Authorize",
        to: () => {
            logout();
            window.location.href = "/auth";
        },
    };

    const action =
        error.code === Error.Definitions.UNAUTHORIZED.code ? unauthorizedAction : undefined;
    return { action };
};

/**
 * @page Страница ошибки
 * @remark Отображается при возникающих ошибках в приложении
 */
const ErrorPage = ({ error }: Props) => {
    useTitle(`Error occurred · ${error.code || "Unknown"}`);
    const { action } = useAppErrors(error);

    return (
        <HeroSheet
            title={error.message}
            description={error.description}
            useSadHero
            action={action}
        />
    );
};

export default ErrorPage;
