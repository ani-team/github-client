import React from "react";
import dayjs from "dayjs";
import { Repository, Language } from "models";
// FIXME: replace to ant.design icons
import FavBtn from "./fav-btn";
import "./index.scss";

// !!! FIXME: specify types
type Props = any;

const Repo = (props: Props) => {
    const { name, primaryLanguage, updatedAt, url, viewerHasStarred, owner } = props as Partial<
        Repository
    >;

    return (
        <div className="repo">
            <div className="repo__info">
                {/* FIXME: hardcoded, replace to generation by {username}/{reponame} */}
                <a href={url?.replace("https://github.com/", "/")}>
                    {owner?.login && `${owner.login}/`}
                    {name}
                </a>
                <div className="repo__other-info">
                    <Lang {...primaryLanguage} />
                    {/* <span style={{ color: hex }}>{primaryLanguage?.name}</span> */}
                    <span>Updated on {dayjs(updatedAt).format("D MMM YYYY")}</span>
                </div>
            </div>
            {viewerHasStarred !== undefined && <FavBtn isFav={viewerHasStarred} />}
        </div>
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
