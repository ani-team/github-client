import React from "react";
import { Alert, Card } from "antd";
import { GithubFilled } from "@ant-design/icons";
import { authorizeGithub } from "../firebase";
import { useAuth } from "../hooks";
import "./index.scss";

/**
 * @page Auth
 * @remark Авторизация проходит через firebase
 * (чтобы работало на всех стендах)
 * Этапы авторизации:
 * 1. Авторизация через Github (/authorize)
 * 2. Получение временного кода доступа
 * 3. Получение токена на основании OAuth данных и полученного кода
 */
const AuthPage = () => {
    const { login } = useAuth();
    const authorize = () => {
        authorizeGithub().then(login);
        // TODO: add catch handling!
    };

    return (
        <div className="page page-auth">
            <Card className="page-auth__form" title="SIGN IN">
                <div className="page-auth__alerts">
                    <Alert type="info" message="While available only GitHub OAuth authorization" />
                </div>
                <button
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
