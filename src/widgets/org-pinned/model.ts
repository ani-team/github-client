import { useOrgPinnedQuery } from "./api";

export function useVisibility(orgname: string) {
    const { data, loading } = useOrgPinnedQuery({ variables: { login: orgname } });
    const pinnedItems = data?.organization?.pinnedItems.nodes;

    if (!loading && !pinnedItems?.length) {
        return false;
    }

    return true;
}
