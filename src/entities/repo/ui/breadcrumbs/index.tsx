import React from "react";
import { Link } from "react-router-dom";

type Props = {
    data: import("shared/api").RepoIdentity;
};
export const RepoBreadcrumbs = ({ data }: Props) => {
    return (
        <h2 className="m-0">
            <Link to={`/${data.owner}`} className="owner">
                {data.owner}
            </Link>
            <span>{" / "}</span>
            <Link to={`/${data.owner}/${data.name}`}>{data.name}</Link>
        </h2>
    );
};
