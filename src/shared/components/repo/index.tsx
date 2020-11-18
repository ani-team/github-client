import React from "react";
import dayjs from "dayjs";
import { Repository } from "models";
// FIXME: replace to ant.design icons
import FavBtn from "./fav-btn";
import "./index.scss";

// !!! FIXME: specify types
type Props = any;

const Repo = (props: Props) => {
    const { name, primaryLanguage, updatedAt, url, viewerHasStarred, owner } = props as Partial<
        Repository
    >;
    const hex = primaryLanguage?.color || "#222";

    return (
        <div className="repo">
            <div className="repo__info">
                {/* FIXME: hardcoded, replace to generation by {username}/{reponame} */}
                <a href={url?.replace("https://github.com/", "/")}>
                    {owner?.login && `${owner.login}/`}
                    {name}
                </a>
                <div className="repo__other-info">
                    <span style={{ color: hex }}>{primaryLanguage?.name}</span>
                    <span>Updated on {dayjs(updatedAt).format("D MMM YYYY")}</span>
                </div>
            </div>
            {viewerHasStarred !== undefined && <FavBtn isFav={viewerHasStarred} />}
        </div>
    );
};

export default Repo;
