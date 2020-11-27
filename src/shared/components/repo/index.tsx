import React from "react";
import dayjs from "dayjs";
import { Repository, Language } from "models";
import Card from "../card";
// FIXME: replace to ant.design icons
import FavBtn from "./fav-btn";
import "./index.scss";

// !!! FIXME: specify types
type Props = any & {
    format?: "owner-repo" | "repo";
};

// FIXME: refactor
const Repo = (props: Props) => {
    const { format = "repo" } = props;
    const { name, primaryLanguage, updatedAt, viewerHasStarred, owner } = props as Partial<
        Repository
    >;

    // prettier-ignore
    const title = (
        (format === "owner-repo" && `${owner?.login}/${name}`) || 
        (format === "repo" && name) ||
        ""
    );

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
            actions={<>{viewerHasStarred !== undefined && <FavBtn isFav={viewerHasStarred} />}</>}
        />
    );
};

// FIXME: specify types
// FIXME: move to shared? (ждем пока появится еще хотя бы 1 место использования)
const Lang = ({ color, name }: Partial<Language>) => {
    if (!color || !name) return null;
    return (
        <div className="repo__lang flex items-center">
            <span
                className="repo__lang-marker"
                style={{
                    backgroundColor: color,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                }}
            />
            <span className="repo__lang-label ml-2">{name}</span>
        </div>
    );
};

export default Repo;
