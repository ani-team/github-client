import React from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { Skeleton } from "antd";
import { Repo, Tabs } from "shared/components";
import { RepositoryAffiliation } from "models";
import { useReposQuery } from "./queries.gen";
import "./index.scss";

type Props = {
    username: string;
};

const typesMap: Record<string, RepositoryAffiliation> = {
    repositories: RepositoryAffiliation.Owner,
    collabs: RepositoryAffiliation.Collaborator,
};

// FIXME: rename to UserRepoList? (coz - user as dep)

const RepoList = ({ username }: Props) => {
    const [tab, setTab] = useQueryParam("tab", withDefault(StringParam, "repositories"));
    const typeEnum = [typesMap[tab]];

    const { data, loading } = useReposQuery({
        variables: { login: username, ownerAffiliations: typeEnum },
    });
    const length = data?.user?.repositories.edges?.length;

    return (
        <div className="repo-list">
            <Tabs className="repo-list__tabs">
                <Tabs.Item
                    name="Repositories"
                    className="repo-tab"
                    active={tab === "repositories" || tab === undefined}
                    onClick={() => setTab("repositories")}
                />
                <Tabs.Item
                    name="Collabs"
                    className="collab-tab"
                    active={tab === "collabs"}
                    onClick={() => setTab("collabs")}
                />
            </Tabs>

            <div className="repo-list__items">
                {loading && (
                    <>
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                    </>
                )}

                {length !== 0 ? (
                    data?.user?.repositories.edges?.map((edge, index) => (
                        // FIXME: destruct more elegant later
                        <Repo key={index} {...edge?.node} />
                    ))
                ) : (
                    <h2 className="repo-list__empty">
                        {username} doesn’t have any public repositories yet.
                    </h2>
                )}
            </div>
        </div>
    );
};

export default RepoList;
