import React from "react";
import { Button } from "antd";
import { useAuth } from "../hooks";
import { useViewerQuery } from "./queries.gen";

const User = () => {
    const { isAuth, logout } = useAuth();
    const { data } = useViewerQuery();
    const { login } = data?.viewer || {};

    /**
     * FIXME: Использовать Link?
     * (но для этого нужна будет обертка Auth.Router на уровне App)
     */
    return (
        <span className="auth-user">
            {isAuth && (
                <>
                    {/* FIXME: use h3 instead */}
                    <a className="m-4 text-white" href={`/${login}`}>
                        {login}
                    </a>
                    <Button className="m-4" onClick={logout}>
                        Logout
                    </Button>
                </>
            )}
            {!isAuth && <Button className="m-4">Sign In</Button>}
        </span>
    );
};

export default User;
