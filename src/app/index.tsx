import React from "react";
import { Layout } from "antd";
import Routing from "pages";
import Header from "./header";
import { withHocs, ErrorHandlingProvider } from "./hocs";
import "./index.scss";

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
                    <ErrorHandlingProvider>
                        <Routing />
                    </ErrorHandlingProvider>
                </Layout.Content>
            </Layout>
        </div>
    );
};

export default withHocs(App);
