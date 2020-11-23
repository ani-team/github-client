import { Skeleton, Tag } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Language, RepoIdentity } from "../../models";
import DetailsCard from "./details-card";
import { useRepoDetailsQuery } from "./queries.gen";
import "./index.scss";

type Props = {
    repo: RepoIdentity;
};

type Collaborator = {
    id: string;
    name: string;
    login: string;
    avatarUrl: string;
};

function RepoDetails({ repo: identity }: Props) {
    const { data, loading } = useRepoDetailsQuery({
        variables: {
            name: identity.name,
            owner: identity.owner,
        },
        errorPolicy: "all",
    });
    const repository = data?.repository;

    const languages = repository?.languages?.nodes?.filter(
        (lang): lang is Language => lang != null,
    );
    const collaborators = repository?.collaborators?.nodes?.filter(
        (collaborator): collaborator is Collaborator => collaborator != null,
    );
    return (
        <div className="flex flex-col">
            <DetailsCard className="common-details" title={identity.name}>
                {loading && (
                    <Skeleton
                        paragraph={{ rows: 1 }}
                        className="common-details__placeholder"
                        active
                    />
                )}
                <div>{repository?.description}</div>
                <br />
                {repository?.homepageUrl && (
                    <a
                        href={repository.homepageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="homepage-link"
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
            {collaborators && (
                <DetailsCard className="mt-4" title="Collaborators" primary>
                    {collaborators?.map(({ id, login, avatarUrl }) => (
                        <div key={id} className="collaborator">
                            <img src={avatarUrl} alt="avatar" />
                            <Link className="name" to={`/${login}`}>
                                {login}
                            </Link>
                        </div>
                    ))}
                </DetailsCard>
            )}
        </div>
    );
}

export default RepoDetails;
