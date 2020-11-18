import React, { lazy } from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "features";

const HomePage = lazy(() => import("./home"));
const RepositoryPage = lazy(() => import("./repository"));
const UserPage = lazy(() => import("./user"));
const SearchPage = lazy(() => import("./search"));

/**
 * Роутинг приложения
 */
const Routing = () => (
    <Auth.Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/:username" component={UserPage} />
        <Route path="/:username/:repository/:branch(tree/[\w\d-_.]+)?" component={RepositoryPage} />
        <Redirect to="/" />
    </Auth.Router>
);

export default Routing;
