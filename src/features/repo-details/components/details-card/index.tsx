import React from "react";
import "./index.scss";
import classNames from "classnames";

type Props = PropsWithChildren<{ title: string; className?: string }>;

function DetailsCard({ title, className, children }: Props) {
    return (
        <div className={classNames("details-card", className)}>
            <h3>{title}</h3>
            {children}
        </div>
    );
}

export default DetailsCard;
