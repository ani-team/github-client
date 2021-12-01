import { alert } from "shared/lib/browser";
import { useDebounce } from "shared/lib/fp";
import * as Queries from "./queries.gen";

/**
 * @hook Логика подписки/отписки от пользователя
 * TODO: add debounced loading/disabled logic
 * TODO: add errors catching
 */
export const useFollowing = (variables?: Queries.UserInfoQueryVariables) => {
    const [follow, followResult] = Queries.useFollowUserMutation();
    const [unfollow, unfollowResult] = Queries.useUnfollowUserMutation();
    const loading = followResult.loading || unfollowResult.loading;
    const debouncedLodaing = useDebounce(loading);

    const handle = async (userId?: string | null, viewerIsFollowing?: boolean) => {
        const actionType = viewerIsFollowing ? "unfollow" : "follow";
        if (!userId) {
            alert.error(`Failed to ${actionType} user, try later`);
            return;
        }
        // request
        const action = viewerIsFollowing ? unfollow : follow;
        await action({
            variables: { userId },
            refetchQueries: [{ variables, query: Queries.UserInfoDocument }],
        });
        // fulfilled
        alert.success(`Successfully ${actionType}ed!`);
    };

    return { handle, loading, debouncedLodaing };
};
