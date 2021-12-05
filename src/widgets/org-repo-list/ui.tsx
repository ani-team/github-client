import React from "react";
import cn from "classnames";
import { Empty } from "antd";
import { RepoCard } from "entities/repo";
import { Card } from "shared/ui";
import { useOrgRepoListQuery } from "./api";
import "./styles.scss";

type Props = {
    orgname: string;
    className?: string;
};
export const OrgRepoList = ({ orgname, className }: Props) => {
    return (
        <div className={cn("org-repo-list", className)}>
            <h2>Repositories</h2>
            <OrgRepoListContent orgname={orgname} />
        </div>
    );
};

const OrgRepoListContent = ({ orgname }: Props) => {
    const { data, loading } = useOrgRepoListQuery({ variables: { login: orgname } });
    const repositories = data?.organization?.repositories.nodes;

    if (loading) {
        return <Card.SkeletonGroup amount={10} />;
    }
    if (!repositories) {
        return (
            <Empty
                className="repo-list__placeholder"
                description={<h2>There is no public repositories</h2>}
            />
        );
    }
    return (
        <div className="org-repo-list-content">
            {repositories.map((repo) => (
                // @ts-ignore
                <RepoCard key={repo?.id} data={repo} loading={loading} />
            ))}
        </div>
    );
};
