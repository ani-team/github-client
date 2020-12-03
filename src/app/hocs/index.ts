import withApollo from "./with-apollo";
import withRouter from "./with-router";
import withAntd from "./with-antd";

/**
 * @hoc Инициализирующая логика приложения
 * FIXME: Потом какой-нибудь `compose` метод заинсталлим откуда-нить и покрасивше будет
 */
export const withHocs = (component: Component) => withAntd(withRouter(withApollo(component)));
