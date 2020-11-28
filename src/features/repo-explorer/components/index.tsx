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
            // Приходится фетчить файл по двум вариантам наименования, т.к. GitHub не умеет в insensitive case =(
            readmeLower: `${branch}:readme.md`,
            readmeUpper: `${branch}:README.md`,
            qualifiedName: `refs/heads/${branch}`,
        },
    });
    const { repository } = repoData || {};
    const branches = (repository?.refs?.nodes || []).filter(
        (branch): branch is { name: string; prefix: string } => branch != null,
    );
    const entries = Array.from(repository?.object?.entries ?? []).sort((a, b) =>
        b.type.localeCompare(a.type),
    );
    const target = repository?.ref?.target;
    const lastCommit =
        (target && {
            message: target.messageHeadline,
            login: target.author?.user?.login,
            avatarUrl: target.author?.user?.avatarUrl,
            name: target.author?.name,
            date: target.author?.date,
        }) ||
        undefined;

    // Приходится фетчить файл по двум вариантам наименования, т.к. GitHub не умеет в insensitive case =(
    const readme = repository?.contentLower?.text || repository?.contentUpper?.text || "";
    return (
        <div>
            <RepoToolbar repo={repo} branches={branches} activeBranch={branch} />
            <EntriesView
                files={entries}
                lastCommit={lastCommit}
                loading={loading}
                className="mt-3"
            />
            <RepoReadme text={readme} loading={loading} />
        </div>
    );
}

export default Explorer;
