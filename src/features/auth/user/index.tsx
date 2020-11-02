import React from "react";
import { Button } from "antd";
import { useAuth } from "../hooks";

const User = () => {
    const { isAuth, token, logout } = useAuth();

    /**
     * FIXME: Использовать Link?
     * (но для этого нужна будет обертка Auth.Router на уровне App)
     */
    return (
        <span className="auth-user">
            {isAuth && (
                <>
                    {/* TODO: gen link to profile */}
                    <span className="m-4 text-white">{token}</span>
                    <Button className="m-4" onClick={logout}>
                        Logout
                    </Button>
                </>
            )}
            {!isAuth && (
                <Button className="m-4" type="primary">
                    Sign In
                </Button>
            )}
        </span>
    );
};

export default User;
