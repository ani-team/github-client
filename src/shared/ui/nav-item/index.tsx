import React from "react";

type Props = {
    href: string;
    children: React.ReactNode;
};
export const NavItem = ({ children, href }: Props) => {
    return (
        <a className="m-4 text-gray-600" href={href} target="_blank" rel="noopener noreferrer">
            {children}
        </a>
    );
};
