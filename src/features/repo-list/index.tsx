import React from "react";
import { Repo, Tabs } from "shared/components";
import { useReposQuery } from "./queries.gen";
import "./index.scss";

type Props = {
    username: string;
};

// FIXME: rename to UserRepoList? (coz - user as dep)

const RepoList = ({ username }: Props) => {
    const { data } = useReposQuery({
        variables: { login: username },
    });

    return (
        <div className="repo-list">
            <Tabs className="repo-list__tabs">
                <Tabs.Item name="Repositories" />
            </Tabs>
            <div className="repo-list__items">
                {data?.user?.repositories.edges?.map((edge, index) => (
                    // FIXME: destruct more elegant later
                    <Repo key={index} {...edge?.node} />
                ))}
            </div>
        </div>
    );
};

export default RepoList;
