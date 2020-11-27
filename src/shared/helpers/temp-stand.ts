import { CREDENTIAL_KEY } from "features/auth";

const tempStandRegex = /^(github-client-47c49|dev-github-client)--pr\d+.+\.web\.app$/;

const isTempStand = () => tempStandRegex.test(window.location.host);

export const loadLocalStorageFromDevIfNeeded = async () => {
    if (!isTempStand()) {
        return;
    }
    // Сделал бы через DefinePlugin, но ради этого делать eject не хочется
    // @ts-ignore
    const { default: createGuest } = await import("cross-domain-storage/guest");
    const storage = createGuest("https://dev.github-client.gq/dev/temp-stands.html");
    const userCredentialRaw = await new Promise<string | undefined>((resolve, reject) =>
        storage.get(CREDENTIAL_KEY, (error: any, data: string | undefined) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(data);
        }),
    );
    if (userCredentialRaw) {
        localStorage.setItem(CREDENTIAL_KEY, userCredentialRaw);
    }
};
