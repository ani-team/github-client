import React from "react";
import { RepoIdentity } from "models";
import { useRepoBranchInfoQuery } from "../queries.gen";
import RepoToolbar from "./toolbar";
import EntriesView from "./entries-view";
import RepoReadme from "./readme";
import { useBranch, useRepoDetails } from "./hooks";

type Props = {
    repo: RepoIdentity;
};

const Explorer = ({ repo }: Props) => {
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
    const repoUrl = `${repo.owner}/${repo.name}`;
    return (
        <div>
            <RepoToolbar repo={repo} branches={branches} activeBranch={branch} />
            <EntriesView files={files} lastCommit={lastCommit} loading={loading} className="mt-3" />
            <RepoReadme text={readme} loading={loading} repoUrl={repoUrl} branch={branch} />
        </div>
    );
};

export default Explorer;
