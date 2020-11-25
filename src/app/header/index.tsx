import React from "react";
import { Layout, Input } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { StringParam, useQueryParams } from "use-query-params";
import * as qs from "query-string";
import { Auth } from "features";
import { ReactComponent as IcLogo } from "./logo.svg";
import "./index.scss";

const Header = () => {
    const { isAuth } = Auth.useAuth();
    // !!! FIXME: limit scope of query-params literals
    const [query] = useQueryParams({
        q: StringParam,
        type: StringParam,
        s: StringParam,
        o: StringParam,
    });
    const location = useLocation();
    const history = useHistory();

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
                        defaultValue={location.pathname === "/search" ? query.q ?? "" : ""}
                        onKeyDown={({ key, currentTarget }) => {
                            if (key === "Enter" && currentTarget.value) {
                                history.push(
                                    `/search?${qs.stringify({
                                        q: currentTarget.value,
                                        type: query.type,
                                        s: query.s,
                                        o: query.o,
                                    })}`,
                                );
                            }
                        }}
                    />
                )}
            </div>
            <Auth.User />
        </Layout.Header>
    );
};

export default Header;
