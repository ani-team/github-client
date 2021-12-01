import { BranchIdentity, RepoIdentity } from "models";
import { RepoBranchInfoQuery, useRepoDefaultBranchQuery } from "./queries.gen";

/**
 * @hook Получение текущей ветки репозитория
 */
export const useBranch = (repo: RepoIdentity) => {
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
export const useRepoDetails = (repoInfo: RepoBranchInfoQuery | undefined) => {
    const { repository } = repoInfo || {};
    const branches = (repository?.refs?.nodes || []).filter(
        (branch): branch is BranchIdentity => !!branch,
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
