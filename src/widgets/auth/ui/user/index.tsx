import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../../model";
import { routes } from "../../lib";

/**
 * Плашка пользователя с базовой информацией
 */
export const User = () => {
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
                    <Link className="m-4 text-white" to={`/${viewer?.username}`}>
                        {viewer?.username}
                    </Link>
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
