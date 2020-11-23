import React from "react";
import { List } from "antd";
import cn from "classnames";
import { Link } from "react-router-dom";

// FIXME: import as ReactComponent
import FileIcon from "../../assets/file.svg";
import FolderIcon from "../../assets/folder.svg";
import { ReactComponent as IcLogo } from "./logo.svg";
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
    };
};

function EntriesView({ loading, files, lastCommit, className }: Props) {
    return (
        <div className={cn("repo-git-view", className)}>
            <List
                header={
                    lastCommit && (
                        <div className="repo-git-view__last-commit">
                            {lastCommit?.avatarUrl !== undefined ? (
                                <>
                                    <img src={lastCommit?.avatarUrl} alt="avatar" />
                                    <Link className="author-name" to={`/${lastCommit?.login}`}>
                                        {lastCommit?.login}
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <img
                                        src={
                                            "https://sun9-64.userapi.com/impf/2JYupaQXK7tuU6qqEN3Y3W0C568RoyyJq1Pu6g/8gOYGcN_NqE.jpg?size=45x28&quality=96&proxy=1&sign=4e4aa683c2bd6ef7c31bced99406e533"
                                        }
                                        alt="тут будет заглушка"
                                    />
                                    <span className="author-name">{lastCommit?.name}</span>
                                </>
                            )}
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
