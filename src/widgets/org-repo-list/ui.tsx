import React from "react";
import cn from "classnames";
import { Empty } from "antd";
import { RepoSearch, repoSearchModel, repoSearchApi } from "features/repo-search";
import { repoStarModel } from "features/repo-star";
import { RepoCard } from "entities/repo";
import { Card } from "shared/ui";
import "./styles.scss";

type Props = {
    orgname: string;
    className?: string;
};

export const OrgRepoList = ({ orgname, className }: Props) => {
    const { query, handleChange } = repoSearchModel.useInput();

    return (
        <div className={cn("org-repo-list", className)}>
            <h2>Repositories</h2>
            <RepoSearch className="mb-4" value={query} onChange={handleChange} />
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
    const { repositories, response, variables } = repoSearchModel.useQuery(searchQuery);
    const starring = repoStarModel.useStarring({
        refetchQueries: [{ variables, query: repoSearchApi.RepoSearchDocument }],
    });

    if (response.loading) {
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
                <RepoCard
                    key={repo.id}
                    data={repo}
                    onStarring={() => starring.handle(repo.id, repo.viewerHasStarred)}
                    loading={starring.debouncedLoadingId === repo.id}
                />
            ))}
        </div>
    );
};
