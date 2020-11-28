import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import { loadLocalStorageFromDevIfNeeded } from ".deploy";
import "normalize.css";
import "antd/dist/antd.css";

function renderApp() {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById("root"),
    );
}

loadLocalStorageFromDevIfNeeded().then(renderApp);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
