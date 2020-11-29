import { alert } from "shared/helpers";
import * as Queries from "./queries.gen";

/**
 * @hook Логика подписки/отписки от пользователя
 */
export const useFollowing = (variables?: Queries.UserInfoQueryVariables) => {
    const [follow, followResult] = Queries.useFollowUserMutation();
    const [unfollow, unfollowResult] = Queries.useUnfollowUserMutation();

    const handleFollowing = (userId?: string | null, viewerIsFollowing?: boolean) => {
        const actionType = viewerIsFollowing ? "unfollow" : "follow";
        if (!userId || followResult.error || unfollowResult.error) {
            alert.error(`Failed to ${actionType} user, try later`);
            return;
        }

        const action = viewerIsFollowing ? unfollow : follow;
        action({
            variables: { userId },
            refetchQueries: [{ variables, query: Queries.UserInfoDocument }],
        });

        // alert.success(`Successfully ${actionType}ed!`);
    };

    // const label = viewerIsFollowing ? "unfollow" : "follow";
    const label = "FFF";
    const loading = false;
    // const handler = viewerIsFollowing ? handleUnfollow : handleFollow;
    // const loadingStatus = viewerIsFollowing ? unfollowLoading : followLoading;
    return { handleFollowing, label, loading };
};
