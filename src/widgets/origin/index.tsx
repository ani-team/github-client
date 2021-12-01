import React from "react";
import { useLocation } from "react-router-dom";
import { GithubFilled } from "@ant-design/icons";
import "./index.scss";

/**
 * Запрещенные для Origin роуты
 * @remark Определяемн на уровне фичи, а не на уровне страницы,
 * т.к. стилями или иными нормальными (!) путями не скрыть кнопку
 *
 * - Соответственно, это должно разрешаться на уровне Origin
 */
const PROHIBITED_ROUTES = [
    // UserPage, Tab=Collabs, isAuth
    "tab=collabs",
];

/**
 * @feature Кнопка-редирект на исходную страницу на GitHub
 */
export const Origin = () => {
    const { pathname, search } = useLocation();
    const location = `${pathname}${search}`;
    /** Скрываем кнопку для запрещенных роутов */
    const disabled = PROHIBITED_ROUTES.some((prohibitedRoute) =>
        location.includes(prohibitedRoute),
    );
    if (disabled) return null;
    /** Логика определения Origin ресурса на GitHub */
    const originLink = `https://github.com${location}`;
    const handleClick = () => {
        window.open(originLink);
    };

    return (
        <button type="button" className="origin" onClick={handleClick} title={originLink}>
            <GithubFilled style={{ fontSize: 48 }} />
        </button>
    );
};
