import { notification } from "antd";
import { useLocalStorage } from "shared/hooks";
import { CREDENTIAL_KEY } from "./consts";
import { authorizeGithub } from "./firebase";
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

export const useAuthFlow = () => {
    const { login } = useAuth();
    const showError = (message: string) =>
        notification.error({ message: "Authorization error", description: message, top: 72 });

    // TODO: add ability to specify redirect url
    const authorize = () => {
        authorizeGithub()
            .then(login)
            .catch((err: Error) => showError(err.message));
    };
    return { authorize };
};
