import { useState } from "react";
import { useDebounce } from "shared/lib/fp";
import { alert } from "shared/lib/browser";
import * as Queries from "./api";

/**
 * @hook star/unstar логика
 * TODO: add debounced loading/disabled logic
 * TODO: add errors catching
 */
export const useStarring = (actionConfig?: any) => {
    // FIXME: simplify?
    const [addStar] = Queries.useAddStarMutation();
    const [removeStar] = Queries.useRemoveStarMutation();
    // FIXME: temp, impl better later
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const debouncedLoadingId = useDebounce(loadingId);

    // FIXME: more strict
    const handle = async (repoId?: string | null, viewerHasStarred?: boolean) => {
        const actionType = viewerHasStarred ? "unstar" : "star";
        if (!repoId) {
            alert.error(`Failed to ${actionType} repo, try later`);
            return;
        }
        setLoadingId(repoId);
        // request
        const action = viewerHasStarred ? removeStar : addStar;
        await action({
            variables: { starrableId: repoId },
            ...actionConfig,
        });
        // fulfilled
        alert.success(`Successfully ${actionType}red!`);
        setLoadingId(null);
    };

    const isLoading = (repoId?: string | null) => {
        if (!repoId) {
            return;
        }
        // debouncedLoadingId === node?.id
        return debouncedLoadingId === repoId;
    };

    return { handle, loadingId, debouncedLoadingId, isLoading };
};
