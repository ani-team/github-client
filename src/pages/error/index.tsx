import React from "react";
// !!! FIXME: это плохо(
// eslint-disable-next-line import/order
import { ErrorDefinitions } from "app/error-handling";
import { Auth, HeroSheet } from "features";
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
        error.code === ErrorDefinitions.UNAUTHORIZED.code ? unauthorizedAction : undefined;
    return { action };
};

/**
 * @page Страница ошибки
 * @remark Отображается при возникающих ошибках в приложении
 */
const ErrorPage = ({ error }: Props) => {
    useTitle("Github Client - Some error happened");
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
