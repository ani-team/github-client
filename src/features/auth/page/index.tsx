import React from "react";
import { GithubFilled } from "@ant-design/icons";
import { Alert, Card } from "antd";
// !!! FIXME: loop imports
import { useTitle } from "pages/helpers";
import { useAuthFlow } from "../hooks";
import "./index.scss";

// FIXME: move to pages level?

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
    useTitle("Sign in to Github Client");
    const { authorize } = useAuthFlow();

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
