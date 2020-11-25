import React from "react";
import cn from "classnames";
import "./index.scss";

type Props = {
    name: string;
    className?: string;
    active?: boolean;
    onClick?: Callback;
    label?: string;
};

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
