import React from "react";
import cn from "classnames";
import "./index.scss";

type Props = {
    name: string;
    className?: string;
    active?: boolean;
    onClick?: Callback;
};

const Tab = ({ name, className, active, onClick }: Props) => {
    return (
        <button className={cn("tab", { active }, className)} onClick={onClick} type="button">
            {name}
        </button>
    );
};

export default Tab;
