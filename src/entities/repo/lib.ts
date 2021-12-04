export function getIdentityUri(data: import("shared/api").RepoIdentity): string {
    return `${data.owner}/${data.name}`;
}
