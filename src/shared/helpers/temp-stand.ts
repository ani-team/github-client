import { CREDENTIAL_KEY } from "features/auth";

const tempStandRegex = /^(github-client-47c49|dev-github-client)--pr\d+.+\.web\.app$/;

const isTempStand = () => tempStandRegex.test(window.location.host);

export const loadLocalStorageFromDevIfNeeded = async () => {
    if (!isTempStand()) {
        return;
    }
    // Сделал бы через DefinePlugin, но ради этого делать eject не хочется
    const { default: xdLocalStorage } = await import("./xd-local-storage");
    const userCredentialRaw = await new Promise<string>((resolve) =>
        xdLocalStorage.getItem(CREDENTIAL_KEY, resolve),
    );
    localStorage.setItem(CREDENTIAL_KEY, userCredentialRaw);
};
