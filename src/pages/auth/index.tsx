import React from "react";
import { Card, Button, Alert } from "antd";
import { GithubFilled } from "@ant-design/icons";
// import { Link } from "react-router-dom";
import { TOKEN_KEY } from "shared/consts";
import { CLIENT_ID } from "shared/get-env";
import "./index.scss";

// TODO: move to auth-feature
/** OAuth Github (URL) */
const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;

/**
 * @page Auth
 * TODO: Декомпозировать по фичам?
 */
const AuthPage = () => {
    return (
        <div className="page page-auth">
            <Card className="page-auth__form" title="SIGN IN">
                <Alert
                    className="page-auth__info"
                    type="info"
                    message="While available only GitHub OAuth autorization"
                />
                <a
                    className="page-auth__link github"
                    href={AUTH_URL}
                    title="Authentication through Github OAuth"
                >
                    <GithubFilled style={{ fontSize: 64, color: "unset" }} />
                </a>
            </Card>
        </div>
    );
};

export default AuthPage;
