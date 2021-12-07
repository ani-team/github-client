import { useOrgPopularQuery } from "./api";

export function useVisibility(orgname: string) {
    const { data, loading } = useOrgPopularQuery({ variables: { login: orgname } });
    const repositories = data?.organization?.repositories.nodes;

    if (!loading && !repositories?.length) {
        return false;
    }

    return true;
}
