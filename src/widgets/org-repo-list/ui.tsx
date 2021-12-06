import React, { useState, useCallback } from "react";
import cn from "classnames";
import { Empty, Input } from "antd";
import { RepoCard } from "entities/repo";
import { Repository } from "shared/api";
import { Card } from "shared/ui";
import { useOrgRepoListQuery, useOrgRepoSearchQuery } from "./api";
import "./styles.scss";

type Props = {
    orgname: string;
    className?: string;
};

const useRepoSearch = () => {
    const [query, setQuery] = useState("");
    const handleChange = useCallback((event) => {
        setQuery(event.target.value);
    }, []);

    return { query, handleChange };
};
export const OrgRepoList = ({ orgname, className }: Props) => {
    const { query, handleChange } = useRepoSearch();

    return (
        <div className={cn("org-repo-list", className)}>
            <h2>Repositories</h2>
            <Input.Search
                className="mb-4"
                placeholder="Find a repository..."
                onChange={handleChange}
            />
            <OrgRepoListContent orgname={orgname} query={query} />
        </div>
    );
};

type ContentProps = {
    orgname: string;
    query: string;
};
const OrgRepoListContent = ({ orgname, query }: ContentProps) => {
    const searchQuery = `org:${orgname} ${query}`;
    // const { data, loading } = useOrgRepoListQuery({ variables: { login: orgname } });
    // const repositories = data?.organization?.repositories.nodes;
    const { data, loading } = useOrgRepoSearchQuery({ variables: { query: searchQuery } });
    const repositories = data?.search.nodes as Repository[];

    if (loading) {
        return <Card.SkeletonGroup amount={10} />;
    }
    if (!repositories?.length) {
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
