export type CredentialWithToken = {
    credential: {
        accessToken: string;
    };
};

/**
 * Контекст авторизации
 */
export type AuthContext = import("firebase").default.auth.UserCredential & CredentialWithToken;

/**
 * Учетные данные пользователя
 */
export type UserCredential = {
    /** Токен доступа */
    accessToken: string;
    /** Логин пользователя */
    username: string;
    // NOTE: Возможно список хранимых полей будет расширяться позднее
};
