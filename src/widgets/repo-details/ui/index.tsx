import { Alert, Spin } from "antd";
import React from "react";
import { RepoDetails as Details, RepoCollaborators } from "entities/repo";
import { RepoIdentity } from "shared/api";
import { useRepoDetailsQuery } from "../api";

import "./index.scss";

type Props = {
    /** repo identity */
    repo: RepoIdentity;
};

/**
 * Информация по репозиторию
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
            <Details identity={identity} loading={loading} repository={repository} />
            <RepoCollaborators repository={repository} />
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
