import React, { lazy } from "react";
import { Layout } from "antd";
import Routing from "pages";
import { ErrorCatcher } from "./error-handling";
import Header from "./header";
import { withHocs } from "./hocs";
import "./index.scss";

// !!! FIXME: manage access
const ErrorPage = lazy(() => import("pages/error"));

/**
 * Entry-point приложения
 * @remark Содержит в HOC-обертке инициализирующую логику приложения
 * @see withHocs
 */
const App = () => {
    return (
        <div className="gc-app" data-testid="gc-app">
            <Layout>
                <Header />
                <Layout.Content className="gc-app-content">
                    <ErrorCatcher handler={({ error }) => <ErrorPage error={error} />}>
                        <Routing />
                    </ErrorCatcher>
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default withHocs(App);
