import React from "react";
import { Layout, Input } from "antd";
import { Link } from "react-router-dom";
import { GITHUB_MAIN, GITHUB_FEEDBACK } from "shared/get-env";
import { Auth } from "features";
import { ReactComponent as IcLogo } from "./logo.svg";
import { useSearchInput } from "./hooks";
import "./index.scss";

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
                <a
                    className="m-4 text-gray-600"
                    href={GITHUB_MAIN}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
                <a
                    className="m-4 text-gray-600"
                    href={GITHUB_FEEDBACK}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Feedback
                </a>
            </div>
            <Auth.User />
        </Layout.Header>
    );
};

export default Header;
