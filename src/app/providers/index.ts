import { compose } from "shared/lib/fp";
import withApollo from "./with-apollo";
import withRouter from "./with-router";
import withAntd from "./with-antd";

/**
 * @hoc Инициализирующая логика приложения
 * @remark Содержит:
 * - логику инициализации antd (withAntd)
 * - логику подключения к API (withApollo)
 * - логику инициализации роутера (withRouter)
 */
export const withProviders = compose(withAntd, withRouter, withApollo);

export { ErrorHandlingProvider } from "./with-error-handling";
