import React from "react";
import { List } from "antd";
import cn from "classnames";
import { Link } from "react-router-dom";
import FileIcon from "../../assets/file.svg";
import FolderIcon from "../../assets/folder.svg";
import "./index.scss";

type Props = {
    loading?: boolean;
    files: Array<{ type: string; name: string }>;
    className?: string;
    lastCommit?: {
        message: string;
        login?: string;
        avatarUrl?: string;
    };
};

function EntriesView({ loading, files, lastCommit, className }: Props) {
    return (
        <div className={cn("repo-git-view", className)}>
            <List
                bordered
                header={
                    lastCommit && (
                        <div className="repo-git-view__last-commit">
                            <img src={lastCommit?.avatarUrl} alt="avatar" />
                            <Link className="author-name" to={`/${lastCommit?.login}`}>
                                {lastCommit?.login}
                            </Link>
                            &nbsp;
                            <span className="commit-message">{lastCommit?.message}</span>
                        </div>
                    )
                }
                loading={loading}
                dataSource={files}
                renderItem={(item) => (
                    <List.Item className="repo-git-view__item">
                        <div>
                            <img alt="type" src={item.type === "tree" ? FolderIcon : FileIcon} />
                            <span>{item.name}</span>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    );
}

export default EntriesView;