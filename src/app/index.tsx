import React, { lazy } from "react";
import { Layout } from "antd";
import Routing from "pages";
import ErrorCatcher from "./error-handling/error-catcher";
import { setupRouter } from "./router";
import withApollo from "./with-apollo";
import Header from "./header";
import "./index.scss";

const ErrorPage = lazy(() => import("pages/error"));
/**
 * Entry-point приложения
 * @remark Содержит в HOC-обертке логику подключения к API (apollo)
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

export default setupRouter(withApollo(App));
