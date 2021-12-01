import React, { lazy, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { Auth } from "widgets/auth";
import { Origin } from "widgets/origin";
import { dom } from "shared/lib/browser";

const HomePage = lazy(() => import("./home"));
const RepositoryPage = lazy(() => import("./repository"));
const UserPage = lazy(() => import("./user"));
const SearchPage = lazy(() => import("./search"));
const AuthPage = lazy(() => import("./auth"));

/**
 * @hook Логика сброса скроллинга на каждой странице
 * @see https://medium.com/@nasir/reset-scroll-position-on-change-of-routes-react-a0bd23093dfe
 */
const useResetScrollAtEveryPage = () => {
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => {
            dom.scrollToTop();
        });
        return () => {
            unlisten();
        };
    }, [history]);
};

/**
 * Роутинг приложения
 */
const Routing = () => {
    const { isAuth, viewer } = Auth.useAuth();
    useResetScrollAtEveryPage();

    if (!isAuth) {
        return (
            <Switch>
                <Route exact path={Auth.routes.main} component={HomePage} />
                <Route exact path={Auth.routes.login} component={AuthPage} />
                <Redirect to={Auth.routes.login} />
            </Switch>
        );
    }
    return (
        <>
            {/* Для авторизованного пользователя добавляем кнопку с редиректом на исходный ресурс на GitHub */}
            <Origin />
            <Switch>
                <Route exact path="/search" component={SearchPage} />
                <Route exact path="/:username" component={UserPage} />
                <Route
                    path="/:username/:repository/:branch(tree/[\w\d-_./]+)?"
                    component={RepositoryPage}
                />
                <Redirect to={`/${viewer?.username}`} />
            </Switch>
        </>
    );
};

export default Routing;
