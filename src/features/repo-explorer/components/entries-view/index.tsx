import React from "react";
import dayjs from "dayjs";
import { List } from "antd";
import cn from "classnames";
import { Link } from "react-router-dom";
import { RepoIdentity } from "../../../../models";
import { GITHUB_DOMAIN } from "../../../../shared/get-env";
import { useBranch } from "../../hooks";
import SkeletonArea from "../skeleton-area";

// FIXME: import as ReactComponent
import FileIcon from "../../assets/file.svg";
import FolderIcon from "../../assets/folder.svg";
import logo from "./placeholder.png";
import "./index.scss";

type GitFile = { type: string; name: string };
type GitFileViewProps = GitFile & { repo: RepoIdentity; branch: string };
type Props = {
    loading?: boolean;
    files: Array<GitFile>;
    className?: string;
    repo: RepoIdentity;
    lastCommit?: {
        message: string;
        login?: string;
        avatarUrl?: string;
        name?: string | null;
        date: string;
    };
};

const EntriesView = ({ loading, files, lastCommit, className, repo }: Props) => {
    const { branch } = useBranch(repo);
    return (
        <div className={cn("repo-git-view", className)}>
            {loading && <SkeletonArea />}
            {!loading && (
                <List
                    header={lastCommit && <LastCommitHeader lastCommit={lastCommit} />}
                    dataSource={files}
                    renderItem={(item) => <GitFileView {...item} repo={repo} branch={branch} />}
                />
            )}
        </div>
    );
};

const GitFileView = ({ name, type, repo, branch }: GitFileViewProps) => {
    const baseUrl = `${GITHUB_DOMAIN}${repo.owner}/${repo.name}`;
    const link = `${baseUrl}/${type}/${branch ? branch + "/" : ""}${name}`;
    return (
        <List.Item className="repo-git-view__item">
            <div>
                <img alt="type" src={type === "tree" ? FolderIcon : FileIcon} />
                <a href={link} target="_blank" rel="noopener noreferrer" className="origin-link">
                    {name}
                </a>
            </div>
        </List.Item>
    );
};

const LastCommitHeader = ({ lastCommit }: { lastCommit: Props["lastCommit"] }) => (
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

export default EntriesView;
