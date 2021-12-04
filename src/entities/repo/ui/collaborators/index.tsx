import React from "react";
import { Link } from "react-router-dom";
import { DetailsCard } from "shared/ui";
import { Repository, User } from "shared/api";

type Props = {
    /** Данные по репозиторию */
    repository: Repository;
};

/**
 * Коллабораторы репозитория
 */
export const RepoCollaborators = ({ repository }: Props) => {
    const collaborators = repository?.collaborators?.nodes?.filter(
        (collaborator): collaborator is User => !!collaborator,
    );

    if (!collaborators) return null;
    return (
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
    );
};
