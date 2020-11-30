import { useLocalStorage } from "shared/hooks";
import { CREDENTIAL_KEY } from "./consts";
import { UserCredential } from "./types";

export const useAuth = () => {
    const [viewer, setViewer] = useLocalStorage<UserCredential | null>(CREDENTIAL_KEY, null);
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
