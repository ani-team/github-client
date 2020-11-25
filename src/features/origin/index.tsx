import React from "react";
import { useLocation } from "react-router-dom";
import { GithubFilled } from "@ant-design/icons";
import "./index.scss";

/**
 * @feature Кнопка-редирект на исходную страницу на GitHub
 */
const Origin = () => {
    const { pathname, search } = useLocation();
    const originLink = `https://github.com${pathname}${search}`;

    const handleClick = () => {
        window.open(originLink);
    };

    return (
        <button type="button" className="origin" onClick={handleClick} title={originLink}>
            <GithubFilled style={{ fontSize: 48 }} />
        </button>
    );
};

export default Origin;
