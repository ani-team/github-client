import React from "react";
import dayjs from "dayjs";
import { List } from "antd";
import cn from "classnames";
import { Link } from "react-router-dom";
import SkeletonArea from "../skeleton-area";

// FIXME: import as ReactComponent
import FileIcon from "../../assets/file.svg";
import FolderIcon from "../../assets/folder.svg";
import logo from "./placeholder.png";
import "./index.scss";

type GitFile = { type: string; name: string };
type Props = {
    loading?: boolean;
    files: Array<GitFile>;
    className?: string;
    lastCommit?: {
        message: string;
        login?: string;
        avatarUrl?: string;
        name?: string | null;
        date: string;
    };
};

const EntriesView = ({ loading, files, lastCommit, className }: Props) => {
    return (
        <div className={cn("repo-git-view", className)}>
            {loading && <SkeletonArea />}
            {!loading && (
                <List
                    header={lastCommit && <LastCommitHeader lastCommit={lastCommit} />}
                    dataSource={files}
                    renderItem={GitFileView}
                />
            )}
        </div>
    );
};

const GitFileView = ({ name, type }: GitFile) => (
    <List.Item className="repo-git-view__item">
        <div>
            <img alt="type" src={type === "tree" ? FolderIcon : FileIcon} />
            <span>{name}</span>
        </div>
    </List.Item>
);

const LastCommitHeader = ({ lastCommit }: { lastCommit: Props["lastCommit"] }) => (
    <div className="repo-git-view__last-commit">
        <div>
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

export default EntriesView;
