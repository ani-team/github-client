import React from "react";
import FavBtn from "./fav-btn";
import "./index.scss";

// !!! FIXME: specify types
type Props = any;

const RepoItem = (props: Props) => {
    const { name, primaryLanguage, updatedAt, url, viewerHasStarred } = props;

    return (
        <div className="repo-item">
            <div className="repo-item__info">
                <a href={url}>{name}</a>
                <div className="info">
                    <span>{primaryLanguage?.name}</span>
                    <span>{updatedAt}</span>
                </div>
            </div>
            <FavBtn isFav={viewerHasStarred} />
        </div>
    );
};

export default RepoItem;
