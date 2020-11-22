import React from "react";
import { Layout } from "antd";
import Routing from "pages";
import { setupRouter } from "./router";
import withApollo from "./with-apollo";
import Header from "./header";
import "./index.scss";

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
                    <Routing />
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default setupRouter(withApollo(App));
