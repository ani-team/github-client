import { Alert, Spin } from "antd";
import React from "react";
import { RepoDetails as Details, RepoCollaborators } from "entities/repo";
import { RepoIdentity, Repository } from "shared/api";
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

    if (!loading && !repository) {
        return null;
    }

    return (
        <div className="flex flex-col">
            <Details identity={identity} loading={loading} repository={repository as Repository} />
            <RepoCollaborators repository={repository as Repository} />
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
