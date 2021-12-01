import { UserCredential } from "../model";

/** @localStorage Учетные данные */
export const CREDENTIAL_KEY = "GITHUB-CLIENT__CREDENTIAL";

/** @localStorage Получение учетных данных */
export const getCredential = () => {
    return JSON.parse(localStorage.getItem(CREDENTIAL_KEY) || "") as UserCredential;
};

/** @localStorage Получение токена доступа */
export const getToken = () => getCredential().accessToken;

/** Базовые роуты модуля авторизации */
export const routes = {
    main: "/",
    logout: "/",
    login: "/auth",
};
