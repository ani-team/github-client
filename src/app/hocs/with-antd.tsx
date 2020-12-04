import React from "react";
import { ConfigProvider } from "antd";

// eslint-disable-next-line max-len
// https://ant.design/docs/react/faq#How-do-I-prevent-Select-Dropdown-DatePicker-TimePicker-Popover-Popconfirm-scrolling-with-the-page

/**
 * @hoc Инициализация antd для корректного использования компонентов
 * @remark Для попапов в системе - возвращаем parentElement (для фикса бага) или document.body (defaultValue)
 * @see https://github.com/ani-team/github-client/issues/162#issuecomment-736676022
 */
const withAntd = (component: Component) => () => (
    <ConfigProvider getPopupContainer={({ parentElement }) => parentElement || document.body}>
        {component()}
    </ConfigProvider>
);

export default withAntd;
