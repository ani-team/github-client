import React from "react";
import cn from "classnames";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Repository } from "models";
import Card from "../card";
import Lang from "./lang";
import "./index.scss";

// !!! FIXME: specify types
type Props = {
    data: any;
    format?: "owner-repo" | "repo";
    onStarring?: Callback;
    loading?: boolean;
};

/**
 * Карточка репозитория
 */
const Repo = (props: Props) => {
    const { format = "repo", onStarring } = props;
    const {
        name,
        primaryLanguage,
        updatedAt,
        viewerHasStarred: starred,
        owner,
    } = props.data as Partial<Repository>;
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

export default Repo;
