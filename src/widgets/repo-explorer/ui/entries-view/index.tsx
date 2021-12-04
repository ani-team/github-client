import React from "react";
import { List } from "antd";
import cn from "classnames";
import { RepoIdentity, GitFile, GitCommit } from "shared/api";
import { SkeletonArea } from "shared/ui";
import { useBranch } from "../../model";
import GitFileView from "./git-file-view";
import LastCommitHeader from "./last-commit-header";
import "./index.scss";

type Props = {
    loading?: boolean;
    files: Array<GitFile>;
    className?: string;
    repo: RepoIdentity;
    lastCommit?: GitCommit;
};

/**
 * Файлы репозитория
 */
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

export default EntriesView;
