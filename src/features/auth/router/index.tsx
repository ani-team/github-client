import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Spin } from "antd";
import { useAuth } from "../hooks";

// TODO: authRequired and notauthRequired routes (by props)
// TODO: Сделать процесс авторизации - более четким и последовательным
type Props = PropsWithChildren;

const AuthPage = lazy(() => import("../page"));
const HomePage = lazy(() => import("pages/home"));

const Router = ({ children }: Props) => {
    const { isAuth } = useAuth();

    return (
        <BrowserRouter>
            <Suspense fallback={<Spin />}>
                <Switch>
                    {isAuth && children}
                    {!isAuth && (
                        <>
                            <Route exact path="/" component={HomePage} />
                            <Route exact path="/auth" component={AuthPage} />
                            {/* <Redirect to="/" /> */}
                        </>
                    )}
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;
