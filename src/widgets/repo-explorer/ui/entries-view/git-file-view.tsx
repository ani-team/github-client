import React from "react";
import { List } from "antd";
import { GITHUB_DOMAIN } from "shared/config";
import { RepoIdentity, GitFile } from "models";
import { ReactComponent as FileIcon } from "./file.svg";
import { ReactComponent as FolderIcon } from "./folder.svg";

type GitFileViewProps = GitFile & { repo: RepoIdentity; branch: string };

const GitFileView = ({ name, type, repo, branch }: GitFileViewProps) => {
    const baseUrl = `${GITHUB_DOMAIN}${repo.owner}/${repo.name}`;
    const link = `${baseUrl}/${type}/${branch ? branch + "/" : ""}${name}`;
    const EntryIcon = type === "tree" ? FolderIcon : FileIcon;
    return (
        <List.Item className="repo-git-view__item">
            <div className="wrapper">
                <EntryIcon className="icon" />
                <a href={link} target="_blank" rel="noopener noreferrer" className="origin-link">
                    {name}
                </a>
            </div>
        </List.Item>
    );
};

export default GitFileView;
