import { Tag } from "antd";
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

function RepoDetails({ repo }: Props) {
    const { data } = useRepoDetailsQuery({
        variables: {
            name: repo.name,
            owner: repo.owner,
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
            <DetailsCard className="common-details" title={repo.name}>
                <div>{repository?.description}</div>
                <br />
                {repository?.homepageUrl != null && (
                    <a href={repository.homepageUrl} target="_blank" rel="noopener noreferrer">
                        {repository.homepageUrl}
                    </a>
                )}
                {languages?.map((lang) => (
                    <Tag className="language-tag" key={lang.id} color={lang.color || "#165694"}>
                        {lang.name}
                    </Tag>
                ))}
            </DetailsCard>
            {collaborators != null && (
                <DetailsCard className="mt-4" title="Collaborators" primary>
                    {collaborators?.map((collaborator) => (
                        <div key={collaborator.id} className="collaborator">
                            <img src={collaborator.avatarUrl} alt="avatar" />
                            <Link className="name" to={`/${collaborator.login}`}>
                                {collaborator.name}
                            </Link>
                        </div>
                    ))}
                </DetailsCard>
            )}
        </div>
    );
}

export default RepoDetails;
