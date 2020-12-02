import React from "react";
import { List } from "antd";
import { GITHUB_DOMAIN } from "shared/get-env";
import { RepoIdentity, GitFile } from "models";
import { ReactComponent as FileIcon } from "../../assets/file.svg";
import { ReactComponent as FolderIcon } from "../../assets/folder.svg";

type GitFileViewProps = GitFile & { repo: RepoIdentity; branch: string };

const GitFileView = ({ name, type, repo, branch }: GitFileViewProps) => {
    const baseUrl = `${GITHUB_DOMAIN}${repo.owner}/${repo.name}`;
    const link = `${baseUrl}/${type}/${branch ? branch + "/" : ""}${name}`;
    const EntryIcon = type === "tree" ? FolderIcon : FileIcon;
    return (
        <List.Item className="repo-git-view__item">
            <div>
                <EntryIcon />
                <a href={link} target="_blank" rel="noopener noreferrer" className="origin-link">
                    {name}
                </a>
            </div>
        </List.Item>
    );
};

export default GitFileView;
