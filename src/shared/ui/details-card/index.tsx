import React from "react";
import cn from "classnames";
import "./index.scss";

type Props = PropsWithChildren<{ title: string; className?: string; primary?: boolean }>;

export const DetailsCard = ({ title, className, primary, children }: Props) => {
    return (
        <div className={cn("details-card", { primary }, className)}>
            <h3>{title}</h3>
            {children}
        </div>
    );
};
