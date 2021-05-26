// FIXME: @lowCoupling
import Origin from "features/origin";
import { useLocalStorage } from "shared/hooks";
import { CREDENTIAL_KEY } from "./consts";
import { UserCredential } from "./types";

/**
 * @hook Использование контекста авторизации и соответствующих методов
 */
export const useAuth = () => {
    const [viewer, setViewer] = useLocalStorage<UserCredential | null>(CREDENTIAL_KEY, null);
    // FIXME: @dry with ...
    const isAuth = !!viewer;

    // FIXME: @dangerAccess
    const login = (credential: UserCredential) => {
        setViewer(credential);
        window.location.href = `/${credential.username}`;
    };
    // FIXME: @dangerAccess
    const logout = () => {
        setViewer(null);
    };

    return { isAuth, viewer, login, logout };
};
