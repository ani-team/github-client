import React from "react";
import { Alert, Card } from "antd";
import { GithubFilled } from "@ant-design/icons";
import { authorizeGithub } from "../firebase";
import { useAuth } from "../hooks";
import { useAccessCode } from "./hooks";
import "./index.scss";

// TODO: Разобраться с безопасностью авторизации
// (хранение данных о client_**, необходимость в прокси и т.д.)

/**
 * @page Auth
 * @remark Этапы авторизации:
 * 1. Авторизация через Github (/authorize)
 * 2. Получение временного кода доступа
 * 3. Получение токена на основании OAuth данных и полученного кода
 */
const AuthPage = () => {
    const { error } = useAccessCode();
    const { login } = useAuth();
    const authorize = () => {
        authorizeGithub().then((result) => {
            console.log(result);
            login(result.credential.accessToken);
        });
    };

    return (
        <div className="page page-auth">
            <Card className="page-auth__form" title="SIGN IN">
                <div className="page-auth__alerts">
                    {error && <Alert type="error" message={error} />}
                    <Alert type="info" message="While available only GitHub OAuth authorization" />
                </div>
                <span
                    className="page-auth__link github"
                    onClick={authorize}
                    title="Authentication through Github OAuth"
                >
                    <GithubFilled style={{ fontSize: 64, color: "unset" }} />
                </span>
            </Card>
        </div>
    );
};

export default AuthPage;
