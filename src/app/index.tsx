import React from "react";
import { Layout } from "antd";
import Routing from "pages";
import { Auth } from "features";
import withApollo from "./with-apollo";
import "./index.scss";

/**
 * Entry-point приложения
 * @remark Содержит в HOC-обертке логику подключения к API (apollo)
 */
const App = () => {
    return (
        <div className="gc-app">
            <Layout>
                <Layout.Header>
                    <a className="gc-app__title text-white m-4" href="/">
                        GC
                    </a>
                    <a className="text-white m-4" href="/debug">
                        debug
                    </a>
                    <Auth.User />
                </Layout.Header>
                <Layout.Content className="gc-app-content">
                    <Routing />
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default withApollo(App);
