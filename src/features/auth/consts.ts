/** @localStorage Токен авторизации */
export const TOKEN_KEY = "GITHUB-CLIENT__TOKEN";

export const getToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY) || "");
