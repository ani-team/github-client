import React from "react";
import { Layout, Input } from "antd";
import * as qs from "query-string";
import { Auth } from "features";
import { ReactComponent as IcLogo } from "./logo.svg";
import "./index.scss";

const getParams = () => qs.parse(window.location.search) as Record<string, string>;

const Header = () => {
    const { isAuth } = Auth.useAuth();
    // !!! FIXME: limit scope of query-params literals
    // TODO: (wrap in QueryParamProvider) - wrap app with header instead of only content?
    // const [search] = useQueryParam("q", StringParam);
    const search = getParams().q || "";

    return (
        <Layout.Header className="header">
            <div className="nav flex flex-grow items-center">
                <a className="header__logo flex items-center" href="/">
                    <IcLogo />
                    {!isAuth && <span className="gc-app__title text-white m-4">GITHUB-CLIENT</span>}
                </a>
                {isAuth && (
                    <Input
                        className="header__search"
                        placeholder="Search..."
                        defaultValue={search}
                        onKeyDown={({ key, target }) => {
                            // @ts-ignore FIXME: specify types
                            if (key === "Enter" && target.value) {
                                window.location.replace(
                                    // !!! FIXME: simplify
                                    `/search?${qs.stringify({
                                        // @ts-ignore FIXME: specify types
                                        q: target.value,
                                        type: getParams().type,
                                        s: getParams().s,
                                        o: getParams().o,
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
