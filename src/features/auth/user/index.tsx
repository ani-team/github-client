import React from "react";
import { Button } from "antd";
import { useAuth } from "../hooks";
import { routes } from "../consts";

/**
 * Плашка пользователя с базовой информацией
 */
const User = () => {
    const { isAuth, logout, viewer } = useAuth();

    /**
     * FIXME: Использовать Link?
     * (но для этого нужна будет обертка Auth.Router на уровне App)
     */
    return (
        <span className="auth-user select-none">
            {isAuth && (
                <>
                    {/* FIXME: use h3 instead */}
                    <a className="m-4 text-white" href={`/${viewer?.username}`}>
                        {viewer?.username}
                    </a>
                    <Button className="m-4" href={routes.logout} onClick={logout}>
                        Logout
                    </Button>
                </>
            )}
            {!isAuth && (
                <Button className="m-4" href={routes.login}>
                    Sign In
                </Button>
            )}
        </span>
    );
};

export default User;
