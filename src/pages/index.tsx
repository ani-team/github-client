import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";

const HomePage = lazy(() => import("./home"));

/**
 * Роутинг приложения
 */
const Routing = () => (
    <BrowserRouter>
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Redirect to="/" />
            </Switch>
        </Suspense>
    </BrowserRouter>
);

export default Routing;
