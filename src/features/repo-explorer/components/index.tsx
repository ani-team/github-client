import React from "react";
import { RepoIdentity } from "models";
import { useRepoBranchInfoQuery, useRepoDefaultBranchQuery } from "../queries.gen";
import RepoToolbar from "./toolbar";
import EntriesView from "./entries-view";
import RepoReadme from "./readme";

type Props = {
    repo: RepoIdentity;
};

function Explorer({ repo }: Props) {
    const { data } = useRepoDefaultBranchQuery({
        variables: {
            name: repo.name,
            owner: repo.owner,
        },
    });
    const branch = repo.branch || data?.repository?.defaultBranchRef?.name || "master";
    const { loading, data: repoData } = useRepoBranchInfoQuery({
        variables: {
            name: repo.name,
            owner: repo.owner,
            expression: `${branch}:`,
            expressionReadme: `${branch}:README.md`,
            qualifiedName: `refs/heads/${branch}`,
        },
    });
    const branches = (repoData?.repository?.refs?.nodes || []).filter(
        (branch): branch is { name: string; prefix: string } => branch != null,
    );
    const entries = Array.from(repoData?.repository?.object?.entries ?? []).sort((a, b) =>
        b.type.localeCompare(a.type),
    );
    const target = repoData?.repository?.ref?.target;
    const lastCommit =
        (target && {
            message: target.messageHeadline,
            login: target.author?.user?.login,
            avatarUrl: target.author?.user?.avatarUrl,
            name: target.author?.name,
            date: target.author?.date,
        }) ||
        undefined;
    return (
        <div>
            <RepoToolbar repo={repo} branches={branches} activeBranch={branch} />
            <EntriesView
                files={entries}
                lastCommit={lastCommit}
                loading={loading}
                className="mt-3"
            />
            <RepoReadme text={repoData?.repository?.content?.text || ""} loading={loading} />
        </div>
    );
}

export default Explorer;
