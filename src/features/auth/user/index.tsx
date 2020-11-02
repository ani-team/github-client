import React from "react";
import { useAuth } from "../hooks";

const User = () => {
    const { isAuth, token } = useAuth();
    // TODO: gen link to profile
    if (isAuth) return <span className="m-4 text-white">{token}</span>;

    /**
     * FIXME: Использовать Link?
     * (но для этого нужна будет обертка Auth.Router на уровне App)
     */
    return (
        <a className="m-4" href="/auth">
            Sign In
        </a>
    );
};

export default User;
