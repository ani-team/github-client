import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../hooks";

// TODO: authRequired and notauthRequired routes (by props)
type Props = PropsWithChildren;

const AuthPage = lazy(() => import("../page"));

const Router = ({ children }: Props) => {
    const { isAuth } = useAuth();

    return (
        <BrowserRouter>
            <Suspense fallback={<Spin />}>
                <Switch>
                    {isAuth && children}
                    {!isAuth && (
                        <>
                            <AuthPage />
                            {/* TODO: <Route exact path="auth" component={AuthPage} />
                             <Redirect to="/auth" /> */}
                        </>
                    )}
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
