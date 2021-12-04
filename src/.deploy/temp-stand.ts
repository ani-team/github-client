import { authLib } from "entities/auth";

const tempStandRegex = /^(github-client-47c49|dev-github-client)--pr\d+.+\.web\.app$/;

const isTempStand = () => tempStandRegex.test(window.location.host);

const STAND_URL_ENV = "REACT_APP_DEV_STORAGE_URL";
const devStorageUrl = process.env[STAND_URL_ENV];

/**
 * Инициализация гостевого режима с псевдо-авторизацией
 */
export const loadLocalStorageFromDevIfNeeded = async () => {
    if (!isTempStand() || !devStorageUrl) {
        if(!devStorageUrl) {
            console.debug(`Note that you need to provide ${STAND_URL_ENV} env to make dev stand work`)
        }
        return;
    }
    // @ts-ignore
    const { default: createGuest } = await import("cross-domain-storage/guest");
    const storage = createGuest(devStorageUrl);
    const userCredentialRaw = await new Promise<string | undefined>((resolve, reject) =>
        storage.get(authLib.CREDENTIAL_KEY, (error: any, data: string | undefined) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(data);
        }),
    );
    if (userCredentialRaw) {
        localStorage.setItem(authLib.CREDENTIAL_KEY, userCredentialRaw);
    }
};
