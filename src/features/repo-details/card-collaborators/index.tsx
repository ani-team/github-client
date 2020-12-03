import React from "react";
import { Link } from "react-router-dom";
import DetailsCard from "../details-card";
import { RepoDetailsQuery } from "../queries.gen";

// FIXME: move to models
type Collaborator = {
    /** id */
    id: string;
    /** Имя пользователя */
    name: string;
    /** Логин пользователя */
    login: string;
    /** Аватар */
    avatarUrl: string;
};

type Props = {
    /** Данные по репозиторию */
    repository: RepoDetailsQuery["repository"];
};

/**
 * Коллабораторы репозитория
 */
const CardCollaborators = ({ repository }: Props) => {
    const collaborators = repository?.collaborators?.nodes?.filter(
        (collaborator): collaborator is Collaborator => !!collaborator,
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

export default CardCollaborators;
