import React, { lazy } from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "features";

const HomePage = lazy(() => import("./home"));
const DebugPage = lazy(() => import("./debug"));
const RepositoryPage = lazy(() => import("./repository"));

/**
 * Роутинг приложения
 */
const Routing = () => (
    <Auth.Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/debug" component={DebugPage} />
        <Route exact path="/repository" component={RepositoryPage} />
        <Redirect to="/" />
    </Auth.Router>
);

export default Routing;
