import { UserCredential } from "./types";

/** @localStorage Учетные данные */
export const CREDENTIAL_KEY = "GITHUB-CLIENT__CREDENTIAL";

export const getToken = () => {
    const credential = JSON.parse(localStorage.getItem(CREDENTIAL_KEY) || "") as UserCredential;
    return credential.accessToken;
};
