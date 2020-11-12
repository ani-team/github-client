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
                    {/* FIXME: gen local link */}
                    <a className="m-4 text-white" href={`https://github.com/${login}`}>
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
