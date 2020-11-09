import React from "react";
import { useReposQuery } from "./query.gen";
import "./index.scss";
import Tab from "./tabs";
import RepoItem from "./repo-item";

type Props = {
    username: string;
};

const RepoList = (props: Props) => {
    const { data } = useReposQuery({
        variables: { login: props.username },
    });

    return (
        <div className="repo-list">
            <Tab name="Repositories" />
            {data?.user?.repositories.edges?.map((repo) => (
                <RepoItem key={repo?.node?.id} {...repo?.node} />
            ))}
        </div>
    );
};

export default RepoList;
