export type CredentialWithToken = {
    credential: {
        accessToken: string;
    };
};

export type AuthContext = import("firebase").default.auth.UserCredential & CredentialWithToken;

export type UserCredential = {
    accessToken: string;
    username: string;
    // NOTE: Возможно список хранимых полей будет расширяться позднее
};
