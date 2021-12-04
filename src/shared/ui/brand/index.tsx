import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IcLogo } from "./logo.svg";
import "./index.scss";

type Props = {
    withTitle: boolean;
};

export const BrandLogo = ({ withTitle }: Props) => {
    return (
        <Link className="brand-logo flex items-center" to="/">
            <IcLogo />
            {withTitle && <span className="gc-app__title text-white m-4">GITHUB-CLIENT</span>}
        </Link>
    );
};
