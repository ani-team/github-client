import * as qs from "query-string";
import { CLIENT_ID, CLIENT_SECRET } from "shared/get-env";

/** OAuth Github (URL) */
export const AUTH_URL = `https://github.com/login/oauth/authorize?${qs.stringify({
    client_id: CLIENT_ID,
    // FIXME: more strict
    redirect_uri: `${window.location.origin}/auth`,
})}`;
export const PROXY = "https://cors-anywhere.herokuapp.com";
const TOKEN_URL = "https://github.com/login/oauth/access_token";

export const getTokenUrl = (code: string) => {
    const params = qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
    });
    return `${PROXY}/${TOKEN_URL}?${params}`;
};
