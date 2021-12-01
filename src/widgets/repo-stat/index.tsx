import React from "react";
import { Statistic, Skeleton } from "antd";
import { RepoIdentity } from "models";
import { useRepoStatQuery } from "./queries.gen";
import { stats, prettyValue, StatName } from "./fixtures";
import "./index.scss";

// NOTE: Я просто хотел отобразить статистику без нагромождений...

type Props = {
    /** repo identity */
    repo: RepoIdentity;
};

/**
 * @feature Статистика репозитория
 */
const RepoStat = ({ repo }: Props) => {
    const { data, loading } = useRepoStatQuery({ variables: repo });
    const baseUrl = `https://github.com/${repo.owner}/${repo.name}`;

    return (
        <div className="repo-stat">
            {loading && (
                <div className="flex justify-between">
                    <Skeleton.Button className="repo-stat__skeleton" active />
                    <Skeleton.Button className="repo-stat__skeleton" active />
                    <Skeleton.Button className="repo-stat__skeleton" active />
                </div>
            )}
            {!loading && (
                <div className="repo-stat__items flex justify-between">
                    {stats.map(({ icon, link, name }) => (
                        <Statistic
                            key={name}
                            title={
                                <a
                                    href={`${baseUrl}/${link}`}
                                    title={`View ${name} on GitHub`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {icon}
                                </a>
                            }
                            value={prettyValue(data?.repository?.[name as StatName].totalCount)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default RepoStat;
