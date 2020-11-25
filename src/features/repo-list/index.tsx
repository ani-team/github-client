import React from "react";
import { Skeleton } from "antd";
import { Repo, Tabs } from "shared/components";
import { useReposQuery } from "./queries.gen";
import { useTabParam, tabsMap } from "./params";
import "./index.scss";

type Props = {
    username: string;
};

// FIXME: rename to UserRepoList? (coz - user as dep)

const RepoList = ({ username }: Props) => {
    const { tab, setTab, tabEnum } = useTabParam();
    const { data, loading } = useReposQuery({
        variables: { login: username, ownerAffiliations: [tabEnum] },
    });
    const length = data?.user?.repositories.edges?.length;

    return (
        <div className="repo-list">
            <Tabs className="repo-list__tabs">
                {Object.keys(tabsMap).map((type) => (
                    <Tabs.Item
                        key={type}
                        name={type.charAt(0).toUpperCase() + type.slice(1)}
                        className="repo-list__tab"
                        active={tab === type}
                        onClick={() => setTab(type)}
                    />
                ))}
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
                    <h2 className="repo-list__placeholder">
                        {username} doesn’t have any public repositories yet.
                    </h2>
                )}
            </div>
        </div>
    );
};

export default RepoList;
