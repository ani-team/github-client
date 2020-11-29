import { alert } from "shared/helpers";
import * as Queries from "./queries.gen";

/**
 * @hook Логика подписки/отписки от пользователя
 * TODO: add debounced loading/disabled logic
 * TODO: add errors catching
 */
export const useFollowing = (variables?: Queries.UserInfoQueryVariables) => {
    const [follow] = Queries.useFollowUserMutation();
    const [unfollow] = Queries.useUnfollowUserMutation();

    const handleFollowing = async (userId?: string | null, viewerIsFollowing?: boolean) => {
        const actionType = viewerIsFollowing ? "unfollow" : "follow";
        if (!userId) {
            alert.error(`Failed to ${actionType} user, try later`);
            return;
        }

        const action = viewerIsFollowing ? unfollow : follow;
        await action({
            variables: { userId },
            refetchQueries: [{ variables, query: Queries.UserInfoDocument }],
        });

        alert.success(`Successfully ${actionType}ed!`);
    };

    return { handleFollowing };
};
