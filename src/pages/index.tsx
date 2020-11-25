import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { Spin } from "antd";
import { Auth, Origin } from "features";

const HomePage = lazy(() => import("./home"));
const RepositoryPage = lazy(() => import("./repository"));
const UserPage = lazy(() => import("./user"));
const SearchPage = lazy(() => import("./search"));

/**
 * Роутинг приложения
 */
const Routing = () => {
    const { isAuth, viewer } = Auth.useAuth();

    if (!isAuth) {
        return (
            <Switch>
                <Route exact path={Auth.routes.main} component={HomePage} />
                <Route exact path={Auth.routes.login} component={Auth.Page} />
                <Redirect to={Auth.routes.main} />
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
                    path="/:username/:repository/:branch(tree/[\w\d-_.]+)?"
                    component={RepositoryPage}
                />
                <Redirect to={`/${viewer?.username}`} />
            </Switch>
        </>
    );
};

const withHocs = (component: () => JSX.Element) => () => (
    <BrowserRouter>
        <Suspense fallback={<Spin />}>
            <QueryParamProvider ReactRouterRoute={Route}>{component()}</QueryParamProvider>
        </Suspense>
    </BrowserRouter>
);

export default withHocs(Routing);
