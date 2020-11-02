import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import * as qs from "query-string";
import { useAuth } from "../hooks";
import { getTokenUrl } from "./consts";

/**
 * @hook Логика работы с кодом доступа (для получения токена)
 */
export const useAccessCode = () => {
    const { search } = useLocation();
    const history = useHistory();
    const { setToken } = useAuth();
    const [error, setError] = useState("");
    const { code } = qs.parse(search);

    useEffect(() => {
        if (typeof code !== "string") return;
        fetch(getTokenUrl(code))
            .then((r) => r.text())
            .then((r) => {
                const data = qs.parse(r) as { [key: string]: any };
                if (data.access_token) {
                    setToken(data.access_token);
                    // FIXME: specify redirect url?
                    history.push("/");
                    return;
                }
                setError(data.error_description || data.error);
            });
    }, [code, history, setToken]);

    return { error };
};
