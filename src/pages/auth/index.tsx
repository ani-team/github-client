import React from "react";
import { OAuthForm } from "widgets/auth";
import { dom } from "shared/lib/browser";
import "./index.scss";

/**
 * @page Auth
 * @remark
 * - Авторизация проходит через firebase (чтобы работало на всех стендах)
 * Этапы авторизации:
 * 1. Авторизация через Github (/authorize)
 * 2. Получение временного кода доступа
 * 3. Получение токена на основании OAuth данных и полученного кода
 */
const AuthPage = () => {
    dom.useTitle("Sign in to Github Client");

    return (
        <div className="page page-auth">
            <OAuthForm />
        </div>
    );
};

export default AuthPage;
