export type CredentialWithToken = {
    credential: {
        accessToken: string;
    };
};

/**
 * Контекст авторизации
 */
export type AuthContext = import("firebase").default.auth.UserCredential & CredentialWithToken;
