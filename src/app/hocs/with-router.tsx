import { Spin } from "antd";
import React, { Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

/**
 * @hoc Инициализация роутера с провайдером для работы с get-параметрами
 */
const withRouter = (component: () => JSX.Element) => () => (
    <BrowserRouter>
        <Suspense fallback={<Spin delay={300} className="overlay" size="large" />}>
            <QueryParamProvider ReactRouterRoute={Route}>{component()}</QueryParamProvider>
        </Suspense>
    </BrowserRouter>
);

export default withRouter;
