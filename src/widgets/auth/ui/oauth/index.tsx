import React from "react";
import { GithubFilled } from "@ant-design/icons";
import { Alert, Card } from "antd";
import { authModel } from "entities/auth";
import { alert } from "shared/lib/browser";

import * as model from "../../model";

export const OAuthForm = () => {
    const { login } = authModel.useAuth();

    // TODO: add ability to specify redirect url
    const authorize = () => {
        model.firebase
            .authGithub()
            .then(login)
            .catch((err: Error) => alert.error("Authorization error", err.message));
    };
    return (
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
    );
};
