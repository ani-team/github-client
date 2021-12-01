import { persist } from "shared/lib/browser";
import { CREDENTIAL_KEY } from "../lib";
import { UserCredential } from "./types";

/**
 * @hook Использование контекста авторизации и соответствующих методов
 */
export const useAuth = () => {
    const [viewer, setViewer] = persist.useLocalStorage<UserCredential | null>(
        CREDENTIAL_KEY,
        null,
    );
    const isAuth = !!viewer;

    // FIXME: specify redirect urls?
    // FIXME: prohibit access?
    const login = (credential: UserCredential) => {
        setViewer(credential);
        window.location.href = `/${credential.username}`;
    };
    // FIXME: prohibit access?
    const logout = () => {
        setViewer(null);
    };

    return { isAuth, viewer, login, logout };
};
