import React from "react";
import { Layout, Input } from "antd";
import { Auth } from "features";
import ImgLogo from "./logo.png";
import "./index.scss";

const Header = () => {
    const { isAuth } = Auth.useAuth();

    return (
        <Layout.Header className="header">
            <div className="nav flex-grow">
                <a className="header__logo" href="/">
                    {/* FIXME: Временная иконка, поправить позже */}
                    <img className="header__logo" src={ImgLogo} alt="logo" width={64} height={64} />
                    {!isAuth && <span className="gc-app__title text-white m-4">GITHUB-CLIENT</span>}
                </a>
                {isAuth && <Input className="header__search" placeholder="Search..." />}
                <a className="text-gray-600 m-4" href="/debug">
                    debug
                </a>
            </div>
            <Auth.User />
        </Layout.Header>
    );
};

export default Header;
