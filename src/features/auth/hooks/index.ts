import { useLocalStorage } from "shared/hooks";
import { TOKEN_KEY } from "../consts";
import { useViewerQuery } from "./queries.gen";

export const useAuth = () => {
    const [token, setToken] = useLocalStorage(TOKEN_KEY, "");
    const { viewer } = useViewerQuery().data || {};

    const isAuth = !!token;

    // FIXME: specify redirect urls?
    const login = (token: string) => {
        setToken(token);
        window.location.href = "/";
    };
    const logout = () => {
        setToken("");
        window.location.href = "/auth";
    };

    return { isAuth, token, login, logout, viewer };
};
