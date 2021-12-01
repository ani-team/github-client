import React from "react";
import { Empty } from "antd";
import { Repo, Card } from "shared/ui";
import { VeryMaybe, Repository } from "models";
import { RepositoriesDetailsFragment } from "../../queries.gen";
import { useStarring } from "../../model";

type Props = {
    /** Флаг загрузки */
    loading: boolean;
    /** Список элементов-репозиториев */
    nodes: RepositoriesDetailsFragment["nodes"];
    /** Мутации по star/unstarring */
    starring: ReturnType<typeof useStarring>;
    /** Логин owner-а */
    username: string;
};

/**
 * Список репозиториев
 */
const RepoListItems = (props: Props) => {
    const { loading, nodes, starring, username } = props;
    const length = nodes?.length;

    return (
        <div className="repo-list__items mt-6">
            {/* NOTE: А то все {PAGE_SIZE} плейсхолдеров слишком много */}
            {loading && <Card.SkeletonGroup amount={10} />}
            {length !== 0 ? (
                nodes?.map((node) => (
                    <Repo
                        onStarring={() => starring.handle(node?.id, node?.viewerHasStarred)}
                        key={node?.id}
                        data={node as VeryMaybe<Repository>}
                        loading={starring.debouncedLoadingId === node?.id}
                    />
                ))
            ) : (
                <Empty
                    className="repo-list__placeholder"
                    description={<h2>{username} doesn’t have any repositories yet.</h2>}
                />
            )}
        </div>
    );
};

export default RepoListItems;
