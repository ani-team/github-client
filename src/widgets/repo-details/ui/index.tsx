import { Alert, Spin } from "antd";
import React from "react";
import { RepoIdentity } from "shared/api";
import { useRepoDetailsQuery } from "../queries.gen";
import CardCommon from "./card-common";
import CardCollaborators from "./card-collaborators";
import "./index.scss";

type Props = {
    /** repo identity */
    repo: RepoIdentity;
};

/**
 * @feature Информация по репозиторию
 */
export const RepoDetails = ({ repo: identity }: Props) => {
    const { data, loading } = useRepoDetailsQuery({
        variables: {
            name: identity.name,
            owner: identity.owner,
        },
        errorPolicy: "all",
    });
    const repository = data?.repository;

    return (
        <div className="flex flex-col">
            <CardCommon identity={identity} loading={loading} repository={repository} />
            <CardCollaborators repository={repository} />
            <Spin spinning={loading}>
                <Alert
                    style={{ borderRadius: 6, marginTop: 10 }}
                    showIcon
                    message="Files access"
                    description="For a while, you can navigate through file tree only after auto-redirecting to github"
                />
            </Spin>
        </div>
    );
};
