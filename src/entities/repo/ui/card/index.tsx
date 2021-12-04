import React from "react";
import cn from "classnames";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
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
    const { name, primaryLanguage, updatedAt, viewerHasStarred: starred, owner } = props.data || {};
    // prettier-ignore
    const title = (
        (format === "owner-repo" && `${owner?.login}/${name}`) || 
        (format === "repo" && name) ||
        ""
    );
    const FavBtn = starred ? HeartFilled : HeartOutlined;

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
                onStarring && (
                    <FavBtn className={cn("repo__fav", { starred })} onClick={onStarring} />
                )
            }
        />
    );
};
