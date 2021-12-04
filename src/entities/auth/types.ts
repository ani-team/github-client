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
