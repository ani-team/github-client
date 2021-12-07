import React from "react";
import { RepoBranches } from "features/repo-branches";
import { RepoClone } from "features/repo-clone";
import { RepoReadme, repoLib } from "entities/repo";
import { RepoIdentity } from "shared/api";
import { useRepoBranchInfoQuery } from "../api";
import { useBranch, useRepoDetails } from "../model";
import EntriesView from "./entries-view";

type Props = {
    /** repo identity */
    repo: RepoIdentity;
};

/**
 * FileExplorer репозитория
 */
export const RepoExplorer = ({ repo }: Props) => {
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
    const repoUrl = repoLib.getIdentityUri(repo);
    return (
        <div>
            <div className="flex justify-between">
                <RepoBranches activeBranch={branch} branches={branches} repo={repo} />
                <RepoClone data={repo} />
            </div>
            <EntriesView
                files={files}
                lastCommit={lastCommit}
                loading={loading}
                repo={repo}
                className="mt-3"
            />
            <RepoReadme text={readme} loading={loading} repoUrl={repoUrl} branch={branch} />
        </div>
    );
};
