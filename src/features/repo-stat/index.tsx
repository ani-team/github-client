import React from "react";
import { Statistic, Skeleton, Col } from "antd";
import { ForkOutlined, EyeOutlined, StarOutlined } from "@ant-design/icons";
import { RepoIdentity } from "models";
import { useRepoStatQuery } from "./queries.gen";
import "./index.scss";

type Props = {
    repo: RepoIdentity;
};

/**
 * @feature Статистика репозитория
 */
const RepoStat = ({ repo }: Props) => {
    const { data, loading } = useRepoStatQuery({ variables: repo });
    const { forks, stargazers, watchers } = data?.repository || {};
    const baseUrl = `https://github.com/${repo.owner}/${repo.name}`;

    return (
        <div className="repo-stat">
            {loading && <Skeleton.Input className="repo-state__skeleton" active />}
            {!loading && (
                <div className="repo-stat__items flex justify-between">
                    <Statistic
                        title={<a href={`${baseUrl}/watchers`}>Watchers</a>}
                        value={watchers?.totalCount}
                        prefix={<EyeOutlined />}
                    />
                    <Statistic
                        title={<a href={`${baseUrl}/stargazers`}>Stars</a>}
                        value={stargazers?.totalCount}
                        prefix={<StarOutlined />}
                    />
                    <Statistic
                        title={<a href={`${baseUrl}/network/members`}>Forks</a>}
                        value={forks?.totalCount}
                        prefix={<ForkOutlined />}
                    />
                </div>
            )}
        </div>
    );
};

export default RepoStat;
