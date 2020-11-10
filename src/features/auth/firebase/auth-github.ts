import firebase from "./init";

type CredentialWithToken = { credential: { accessToken: string } };

const isResultWithToken = (result: any): result is CredentialWithToken => {
    return typeof result?.credential?.accessToken === "string";
};

export default function authGithub() {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope("repo");
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
            if (isResultWithToken(result)) return result;
            return Promise.reject("Access token is not present");
        });
}
