import React from "react";
import cn from "classnames";
import { RepoCard } from "entities/repo";
import { Card } from "shared/ui";
import { useOrgPopularQuery } from "./api";
import "./styles.scss";

type Props = {
    orgname: string;
    className?: string;
};
export const OrgPopular = ({ orgname, className }: Props) => {
    const { data, loading } = useOrgPopularQuery({ variables: { login: orgname } });
    const repositories = data?.organization?.repositories.nodes;

    if (!loading && !repositories?.length) {
        return null;
    }

    return (
        <div className={cn("org-popular", className)}>
            <h2>Popular</h2>
            <OrgPopularContent orgname={orgname} />
        </div>
    );
};

const OrgPopularContent = ({ orgname }: Props) => {
    const { data, loading } = useOrgPopularQuery({ variables: { login: orgname } });
    const repositories = data?.organization?.repositories.nodes;

    if (loading) {
        return <Card.SkeletonGroup amount={3} />;
    }
    return (
        <div className="org-popular-content flex flex-wrap justify-between">
            {repositories?.map((repo) => (
                // @ts-ignore
                <RepoCard key={repo?.id} data={repo} />
            ))}
        </div>
    );
};
