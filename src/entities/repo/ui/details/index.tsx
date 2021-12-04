import React from "react";
import { Skeleton, Tag } from "antd";
import { Language, RepoIdentity, Repository } from "shared/api";
import { DetailsCard } from "shared/ui";

type Props = {
    /** Данные по репозиторию */
    repository: Repository;
    /** repo identity */
    identity: RepoIdentity;
    /** Флаг загрузки */
    loading: boolean;
};

/**
 * Общая информация по репозиторию
 */
export const RepoDetails = (props: Props) => {
    const { repository, identity, loading } = props;
    const languages = repository?.languages?.nodes?.filter((lang): lang is Language => !!lang);
    return (
        <DetailsCard className="common-details" title={identity.name}>
            {loading && (
                <Skeleton paragraph={{ rows: 1 }} className="common-details__placeholder" active />
            )}
            {repository?.description ? (
                <div>{repository?.description}</div>
            ) : (
                <p>No description, website, or topics provided.</p>
            )}
            <br />
            {repository?.homepageUrl && (
                <a
                    href={repository.homepageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="homepage-link"
                    title={repository.homepageUrl}
                >
                    {repository.homepageUrl}
                </a>
            )}
            {languages?.map(({ id, name, color }) => (
                <Tag className="language-tag" key={id} color={color || "#165694"}>
                    {name}
                </Tag>
            ))}
        </DetailsCard>
    );
};
