import React, { useEffect, useState } from "react";
import { Card, Alert } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import { GithubFilled } from "@ant-design/icons";
import * as qs from "query-string";
import { TOKEN_KEY } from "shared/consts";
import { CLIENT_ID, CLIENT_SECRET } from "shared/get-env";
import "./index.scss";

// TODO: Разобраться с безопасностью авторизации
// (хранение данных о client_**, необходимость в прокси и т.д.)

// TODO: move to auth-feature
/** OAuth Github (URL) */
const AUTH_URL = `https://github.com/login/oauth/authorize?${qs.stringify({
    client_id: CLIENT_ID,
    // FIXME: more strict
    redirect_uri: `${window.location.origin}/auth`,
})}`;
const PROXY = "https://cors-anywhere.herokuapp.com";
const TOKEN_URL = "https://github.com/login/oauth/access_token";

const useAccessCode = () => {
    const { search } = useLocation();
    const history = useHistory();
    const [error, setError] = useState("");
    const { code } = qs.parse(search);

    useEffect(() => {
        if (typeof code !== "string") return;
        const params = qs.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
        });
        fetch(`${PROXY}/${TOKEN_URL}?${params}`)
            .then((r) => r.text())
            .then((r) => {
                const data = qs.parse(r) as { [key: string]: any };
                if (data.access_token) {
                    localStorage.setItem(TOKEN_KEY, data.access_token);
                    history.push("/");
                    return;
                }
                setError(data.error_description || data.error);
            });
    }, [code, history]);

    return { error };
};
/**
 * @page Auth
 * TODO: Декомпозировать по фичам?
 */
const AuthPage = () => {
    const { error } = useAccessCode();

    return (
        <div className="page page-auth">
            <Card className="page-auth__form" title="SIGN IN">
                <div className="page-auth__alerts">
                    {error && <Alert type="error" message={error} />}
                    <Alert type="info" message="While available only GitHub OAuth autorization" />
                </div>
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
