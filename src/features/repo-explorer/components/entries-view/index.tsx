import React from "react";
import dayjs from "dayjs";
import { List } from "antd";
import cn from "classnames";
import { Link } from "react-router-dom";

// FIXME: import as ReactComponent
import FileIcon from "../../assets/file.svg";
import FolderIcon from "../../assets/folder.svg";
import logo from "./placeholder.png";
import "./index.scss";

type Props = {
    loading?: boolean;
    files: Array<{ type: string; name: string }>;
    className?: string;
    lastCommit?: {
        message: string;
        login?: string;
        avatarUrl?: string;
        name?: string | null;
        date: string;
    };
};

function EntriesView({ loading, files, lastCommit, className }: Props) {
    return (
        <div className={cn("repo-git-view", className)}>
            <List
                header={
                    lastCommit && (
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
                                <span className="commit-date">
                                    on {dayjs(lastCommit.date).format("D MMM YYYY")}
                                </span>
                            </div>
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
