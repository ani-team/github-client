import React from "react";
import "./index.scss";
import classNames from "classnames";

type Props = PropsWithChildren<{ title: string; className?: string; primary?: boolean }>;

function DetailsCard({ title, className, primary, children }: Props) {
    return (
        <div
            className={classNames("details-card", { "details-card__primary": primary }, className)}
        >
            <h3>{title}</h3>
            {children}
        </div>
    );
}

export default DetailsCard;
