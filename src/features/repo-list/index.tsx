import React from "react";
import { useReposQuery } from "./queries.gen";
import Tab from "./tab";
import RepoItem from "./repo-item";
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
            <div className="repo-list__tabs">
                <Tab name="Repositories" />
            </div>
            <div className="repo-list__items">
                {data?.user?.repositories.edges?.map((edge) => (
                    // FIXME: destruct more elegant later
                    <RepoItem key={edge?.node?.id} {...edge?.node} />
                ))}
            </div>
        </div>
    );
};

export default RepoList;
