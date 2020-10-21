import React from "react";
import { Layout } from "antd";
import Routing from "pages";
import withApollo from "./with-apollo";
import "./index.scss";

/**
 * Entry-point приложения
 * @remark Содержит в HOC-обертке логику работы с API (apollo)
 */
const App = () => {
    return (
        <div className="gc-app">
            <Layout>
                <Layout.Header>
                    <span className="gc-app__title text-white">GC</span>
                </Layout.Header>
                <Layout.Content className="gc-app-content">
                    <Routing />
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default withApollo(App);
