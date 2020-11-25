import withApollo from "./with-apollo";
import withRouter from "./with-router";

// Потом какой-нибудь `compose` метод заинсталлим откуда-нить и покрасивше будет
export const withHocs = (component: Component) => withRouter(withApollo(component));
