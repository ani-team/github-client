import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { GitCommit } from "shared/api";
import logo from "./placeholder.png";

type Props = {
    lastCommit: GitCommit;
};

const LastCommitHeader = ({ lastCommit }: Props) => {
    const { login, name, avatarUrl, message, date } = lastCommit || {};
    return (
        <div className="repo-git-view__last-commit">
            <div className="commit-info">
                <img src={avatarUrl ?? logo} alt="avatar" />
                {avatarUrl ? (
                    <Link className="author-name" to={`/${login}`}>
                        {login}
                    </Link>
                ) : (
                    <span className="author-name">{name}</span>
                )}
                &nbsp;
                <span className="commit-message" title={message}>
                    {message}
                </span>
            </div>
            <div>
                <span className="commit-date">on {dayjs(date).format("D MMM YYYY")}</span>
            </div>
        </div>
    );
};

export default LastCommitHeader;
