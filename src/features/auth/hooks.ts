import { useLocalStorage } from "shared/hooks";
import { TOKEN_KEY } from "./consts";

export const useAuth = () => {
    const [token, setToken] = useLocalStorage(TOKEN_KEY, "");

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

    return { isAuth, token, login, logout };
};
