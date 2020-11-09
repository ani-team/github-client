import React from "react";
import HeartIcon from "./icon";
import "./index.scss";

// !!! FIXME: specify types
type Props = any;

const RepoItem = (props: Props) => {
    const { name, primaryLanguage, updatedAt, url, viewerHasStarred } = props;

    return (
        <div className="repo-item">
            <div id="repo-info">
                <div>
                    <a href={url}>{name}</a>
                </div>
                <div id="info">
                    <span>{primaryLanguage?.name}</span>
                    <span>{updatedAt}</span>
                </div>
            </div>
            <HeartIcon viewerHasStarred={viewerHasStarred} />
        </div>
    );
};

export default RepoItem;
