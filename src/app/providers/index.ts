import { compose } from "shared/lib/fp";
import withApollo from "./with-apollo";
import withRouter from "./with-router";
import withAntd from "./with-antd";
import "./with-firebase";

export const withProviders = compose(withAntd, withRouter, withApollo);

export { ErrorHandlingProvider } from "./with-error-handling";
