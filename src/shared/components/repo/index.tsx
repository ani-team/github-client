import React from "react";
import cn from "classnames";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Repository } from "models";
import Card from "../card";
import Lang from "./lang";
import "./index.scss";

// !!! FIXME: specify types
type Props = any & {
    format?: "owner-repo" | "repo";
    onClick?: Callback;
};

// FIXME: refactor
const Repo = (props: Props) => {
    const { format = "repo" } = props;
    const { onClick } = props;
    const { name, primaryLanguage, updatedAt, viewerHasStarred, owner } = props as Partial<
        Repository
    >;
    // prettier-ignore
    const title = (
        (format === "owner-repo" && `${owner?.login}/${name}`) || 
        (format === "repo" && name) ||
        ""
    );
    const FavBtn = viewerHasStarred ? HeartFilled : HeartOutlined;

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
                <FavBtn
                    className={cn("repo__fav", { starred: viewerHasStarred })}
                    onClick={onClick}
                />
            }
        />
    );
};

export default Repo;
