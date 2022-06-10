import React from "react";
import { GithubFilled } from "@ant-design/icons";
import { Alert, Card } from "antd";
import { alert } from "shared/helpers";
import * as Auth from "features/auth";
import { useTitle } from "../helpers";
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
    useTitle("Sign in to Github Client");
    const { login } = Auth.useAuth();

    // TODO: add ability to specify redirect url
    const authorize = () => {
        Auth.authorizeGithub()
            .then(login)
            .catch((err: Error) => alert.error("Authorization error", err.message));
    };

    return (
        <div className="page page-auth">
            <Card className="page-auth__form" title="SIGN IN">
                <div className="page-auth__alerts">
                    <Alert type="info" message="While available only GitHub OAuth authorization" />
                </div>
                <button
                    type="button"
                    className="page-auth__link github"
                    onClick={authorize}
                    title="Authentication through Github OAuth"
                >
                    <GithubFilled style={{ fontSize: 64, color: "unset" }} />
                </button>
            </Card>
        </div>
    );
};

export default AuthPage;
