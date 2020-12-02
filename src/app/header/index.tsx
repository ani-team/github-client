import React, { KeyboardEventHandler } from "react";
import { Layout, Input } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { StringParam, useQueryParams } from "use-query-params";
import * as qs from "query-string";
import { GITHUB_MAIN, GITHUB_FEEDBACK } from "shared/get-env";
import { Auth } from "features";
import { ReactComponent as IcLogo } from "./logo.svg";
import "./index.scss";

// FIXME: get from `pages`?
const SEARCH_URL = "/search";

/**
 * @hook Логика обработки инпута поиска
 */
const useSearchInput = () => {
    // !!! FIXME: limit scope of query-params literals
    const [query] = useQueryParams({
        q: StringParam,
        type: StringParam,
        s: StringParam,
        o: StringParam,
    });
    const location = useLocation();
    const history = useHistory();

    /**
     * Обработка инпута поиска
     */
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = ({ key, currentTarget }) => {
        if (key === "Enter" && currentTarget.value) {
            const q = currentTarget.value;
            history.push(`${SEARCH_URL}?${qs.stringify({ ...query, q })}`);
        }
    };
    /**
     * Поисковой запрос
     * @remark Если не страница поиска - обнуляем инпут
     */
    const searchValue = location.pathname === SEARCH_URL ? query.q ?? "" : "";

    return { handleKeyDown, searchValue };
};

/**
 * Хедер приложения
 * @remark Содержит поисковой инпут с базовой логикой
 */
const Header = () => {
    const { isAuth } = Auth.useAuth();
    const { handleKeyDown, searchValue } = useSearchInput();

    return (
        <Layout.Header className="header">
            <div className="nav flex flex-grow items-center">
                <Link className="header__logo flex items-center" to="/">
                    <IcLogo />
                    {!isAuth && <span className="gc-app__title text-white m-4">GITHUB-CLIENT</span>}
                </Link>
                {isAuth && (
                    <Input
                        className="header__search"
                        placeholder="Search..."
                        defaultValue={searchValue}
                        onKeyDown={handleKeyDown}
                    />
                )}
                <a className="m-4 text-gray-600" href={GITHUB_MAIN}>
                    GitHub
                </a>
                <a className="m-4 text-gray-600" href={GITHUB_FEEDBACK}>
                    Feedback
                </a>
            </div>
            <Auth.User />
        </Layout.Header>
    );
};

export default Header;
