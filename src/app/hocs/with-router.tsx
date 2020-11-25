import { Spin } from "antd";
import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

const withRouter = (component: Component) => () => (
    <BrowserRouter>
        <Suspense fallback={<Spin />}>
            <QueryParamProvider ReactRouterRoute={Route}>{component()}</QueryParamProvider>
        </Suspense>
    </BrowserRouter>
);

export default withRouter;
