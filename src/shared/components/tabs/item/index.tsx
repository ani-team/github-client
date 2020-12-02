import React from "react";
import cn from "classnames";
import "./index.scss";

type Props = {
    /** Название */
    name: string;
    /** className */
    className?: string;
    /** @flag Активный */
    active?: boolean;
    /** @handler По клику */
    onClick?: Callback;
    /**
     * Доп. лейбл
     * @remark Обычно используется для отображения счетчика
     */
    label?: string;
};

/**
 * @UIKit Вкладка
 */
const Tab = (props: Props) => {
    const { name, className, active, onClick, label } = props;
    return (
        <button className={cn("tab", { active }, className)} onClick={onClick} type="button">
            <span className="tab__content">{name}</span>
            {label && <span className="tab__label">{label}</span>}
        </button>
    );
};

export default Tab;
