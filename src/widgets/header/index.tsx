import React from "react";
import { Layout } from "antd";
import { User } from "widgets/auth";
import { SearchInput } from "features/search";
import { authModel } from "entities/auth";
import { GITHUB_MAIN, GITHUB_FEEDBACK } from "shared/config";
import { BrandLogo, NavItem } from "shared/ui";
import "./index.scss";

/**
 * Хедер приложения
 * @remark Содержит поисковой инпут с базовой логикой
 */
const Header = () => {
    const { isAuth } = authModel.useAuth();

    return (
        <Layout.Header className="header">
            <div className="nav flex flex-grow items-center">
                <BrandLogo withTitle={!isAuth} />
                {isAuth && <SearchInput />}
                <NavItem href={GITHUB_MAIN}>GitHub</NavItem>
                <NavItem href={GITHUB_FEEDBACK}>Feedback</NavItem>
            </div>
            <User />
        </Layout.Header>
    );
};

export default Header;
