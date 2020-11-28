import React from "react";
import { RepoIdentity } from "models";
import {
    useRepoBranchInfoQuery,
    useRepoDefaultBranchQuery,
    RepoBranchInfoQuery,
} from "../queries.gen";
import RepoToolbar from "./toolbar";
import EntriesView from "./entries-view";
import RepoReadme from "./readme";

type Props = {
    repo: RepoIdentity;
};

/**
 * @hook Получение текущей ветки репозитория
 */
const useBranch = (repo: Props["repo"]) => {
    const { data } = useRepoDefaultBranchQuery({
        variables: {
            name: repo.name,
            owner: repo.owner,
        },
    });
    const branch = repo.branch || data?.repository?.defaultBranchRef?.name || "master";
    return { branch };
};

/**
 * @hook Получение нужных полей по сфетченным данным по репозиторию
 */
const useRepoDetails = (repoInfo: RepoBranchInfoQuery | undefined) => {
    const { repository } = repoInfo || {};
    const branches = (repository?.refs?.nodes || []).filter(
        (branch): branch is { name: string; prefix: string } => branch != null,
    );
    const files = Array.from(repository?.object?.entries ?? []).sort((a, b) =>
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
    return {
        branches,
        files,
        lastCommit,
        readme,
    };
};

function Explorer({ repo }: Props) {
    const { branch } = useBranch(repo);
    const { loading, data } = useRepoBranchInfoQuery({
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
    const { branches, files, lastCommit, readme } = useRepoDetails(data);

    return (
        <div>
            <RepoToolbar repo={repo} branches={branches} activeBranch={branch} />
            <EntriesView files={files} lastCommit={lastCommit} loading={loading} className="mt-3" />
            <RepoReadme text={readme} loading={loading} />
        </div>
    );
}

export default Explorer;
