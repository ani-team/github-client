import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { GitCommit } from "models";
import logo from "./placeholder.png";

type Props = {
    lastCommit: GitCommit;
};

const LastCommitHeader = ({ lastCommit }: Props) => (
    <div className="repo-git-view__last-commit">
        <div className="commit-info">
            {lastCommit?.avatarUrl ? (
                <>
                    <img src={lastCommit?.avatarUrl} alt="avatar" />
                    <Link className="author-name" to={`/${lastCommit?.login}`}>
                        {lastCommit?.login}
                    </Link>
                </>
            ) : (
                <>
                    <img src={logo} alt="avatar" />
                    <span className="author-name">{lastCommit?.name}</span>
                </>
            )}
            &nbsp;
            <span className="commit-message" title={lastCommit?.message}>
                {lastCommit?.message}
            </span>
        </div>
        <div>
            <span className="commit-date">on {dayjs(lastCommit?.date).format("D MMM YYYY")}</span>
        </div>
    </div>
);

export default LastCommitHeader;
