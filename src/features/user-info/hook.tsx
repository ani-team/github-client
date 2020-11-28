import { SmileOutlined } from "@ant-design/icons";
import { notification } from "antd";
import React from "react";
import * as Queries from "./queries.gen";

const useFollow = (
    id: string | undefined | null,
    viewerIsFollowing: boolean | undefined,
    refetch: any,
) => {
    const [
        followUser,
        { loading: followLoading, error: followError },
    ] = Queries.useFollowUserMutation();
    const [
        unfollowUser,
        { loading: unfollowLoading, error: unfollowError },
    ] = Queries.useUnfollowUserMutation();

    // FIXME: Потом надо бы брать из LocalStorage,а не запросом
    const { viewer } = Queries.useCredentialsQuery().data || {};

    const handleFollow = () => {
        if (!id || followError) {
            notification.open({
                type: "error",
                message: "Error!",
                description: "something went wrong, try again",
            });
            return;
        }
        followUser({
            variables: { id: id, clientMutationId: viewer?.id },
        });

        open();

        async function open() {
            await refetch();
            notification.open({
                message: "Success!",
                description: "subscription was successfully completed",
                icon: <SmileOutlined style={{ color: "#3399ff" }} />,
            });
        }
    };

    const handleUnfollow = () => {
        if (!id || unfollowError) {
            notification.open({
                type: "error",
                message: "Error!",
                description: "something went wrong, try again",
            });
            return;
        }
        unfollowUser({
            variables: { id: id, clientMutationId: viewer?.id },
        });

        open();

        async function open() {
            await refetch();
            notification.open({
                message: "Success!",
                description: "unsubscription was successfully completed",
                icon: <SmileOutlined style={{ color: "#3399ff" }} />,
            });
        }
    };

    const label = viewerIsFollowing === true ? "unfollow" : "follow";
    const handler = viewerIsFollowing === true ? handleUnfollow : handleFollow;
    const loadingStatus = handler === handleFollow ? followLoading : unfollowLoading;
    return { label, handler, loadingStatus };
};

export default useFollow;
