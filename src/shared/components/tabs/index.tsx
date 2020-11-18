import React from "react";
import cn from "classnames";
import Item from "./item";

type Props = PropsWithChildren<{
    className?: string;
}>;
const Tabs = ({ children, className }: Props) => {
    return <div className={cn("tabs", className)}>{children}</div>;
};

Tabs.Item = Item;
export default Tabs;
