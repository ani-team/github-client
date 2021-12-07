import React from "react";
import dayjs from "dayjs";
import { RepoStar } from "features/repo-star";
import { VeryMaybe, Repository } from "shared/api";
import { Card } from "shared/ui";
import Lang from "./lang";
import "./index.scss";

type Props = {
    /** Данные по репозиторию */
    data: VeryMaybe<Repository>;
    /** Формат отображения заголовка */
    format?: "owner-repo" | "repo";
    /** @handler star/unstar */
    onStarring?: Callback;
    /** Флаг загрузки */
    loading?: boolean;
};

/**
 * @ItemEntity Карточка репозитория
 */
export const RepoCard = (props: Props) => {
    const { format = "repo", onStarring, loading } = props;
    const { name, primaryLanguage, updatedAt, owner } = props.data || {};
    // prettier-ignore
    const title = (
        (format === "owner-repo" && `${owner?.login}/${name}`) || 
        (format === "repo" && name) ||
        ""
    );

    return (
        <Card
            className="repo"
            loading={loading}
            title={title}
            titleHref={`/${owner?.login}/${name}`}
            description={
                <div className="repo__extra">
                    <Lang {...primaryLanguage} />
                    <span className="repo__date">
                        Updated on {dayjs(updatedAt).format("D MMM YYYY")}
                    </span>
                </div>
            }
            actions={
                // TODO: impl later for search page
                onStarring && <RepoStar onStarring={onStarring} data={props.data} />
            }
        />
    );
};
