import { AuthContext } from "../types";
import firebase from "./init";

/**
 * Проверка респонса от сервиса во время авторизации
 * @remark Минимально нужные поля для продолжения работы в системе
 */
const isValidAuthContext = (ctx: any): ctx is AuthContext => {
    return (
        typeof ctx?.credential?.accessToken === "string" &&
        typeof ctx?.additionalUserInfo.username === "string"
    );
};

/**
 * Авторизация Github OAuth через firebase
 * @remark Стоит использовать только на странице Авторизации!!!
 */
function authGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");
    provider.addScope("user:follow");
    provider.addScope("read:org");

    return firebase
        .auth()
        .signInWithPopup(provider)
        .then((ctx) => {
            if (!isValidAuthContext(ctx)) {
                return Promise.reject("Not enough auth context was presented");
            }

            return {
                accessToken: ctx.credential.accessToken,
                // FIXME: more strict types
                username: ctx.additionalUserInfo!.username!,
            };
        });
}

export default authGithub;
