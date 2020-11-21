import { AuthContext } from "../types";
import firebase from "./init";

const isValidAuthContext = (ctx: any): ctx is AuthContext => {
    return (
        typeof ctx?.credential?.accessToken === "string" &&
        typeof ctx?.additionalUserInfo.username === "string"
    );
};

export default function authGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");
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
