import { UserCredential } from "./types";

/** @localStorage Учетные данные */
export const CREDENTIAL_KEY = "GITHUB-CLIENT__CREDENTIAL";

export const getCredential = () => {
    return JSON.parse(localStorage.getItem(CREDENTIAL_KEY) || "") as UserCredential;
};

export const getToken = () => getCredential().accessToken;

export const routes = {
    main: "/",
    logout: "/",
    login: "/auth",
};
