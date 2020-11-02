import { useLocalStorage } from "shared/hooks";
import { TOKEN_KEY } from "./consts";

export const useAuth = () => {
    const [token, setToken] = useLocalStorage(TOKEN_KEY, "");

    const isAuth = !!token;
    return { isAuth, token, setToken };
};
