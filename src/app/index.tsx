import React from "react";
import { Layout } from "antd";
import Routing from "pages";
import "./index.scss";

/**
 * Entry-point приложения
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

export default App;
