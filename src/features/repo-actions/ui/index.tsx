import React from "react";
import { Statistic, Skeleton } from "antd";
import { RepoIdentity } from "shared/api";
import { prettyNumeric } from "shared/lib/string";
import { useRepoStatQuery } from "../api";
import { stats, StatName } from "./fixtures";
import "./index.scss";

// NOTE: Я просто хотел отобразить статистику без нагромождений...

type Props = {
    /** repo identity */
    repo: RepoIdentity;
};

/**
 * Статистика репозитория
 */
export const RepoActions = ({ repo }: Props) => {
    const { data, loading } = useRepoStatQuery({ variables: repo });
    const baseUrl = `https://github.com/${repo.owner}/${repo.name}`;

    return (
        <div className="repo-actions">
            {loading && (
                <div className="flex justify-between">
                    <Skeleton.Button className="repo-actions__skeleton" active />
                    <Skeleton.Button className="repo-actions__skeleton" active />
                    <Skeleton.Button className="repo-actions__skeleton" active />
                </div>
            )}
            {!loading && (
                <div className="repo-actions__items flex justify-between">
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
                            value={prettyNumeric(data?.repository?.[name as StatName].totalCount)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
