import React from "react";
import { Button } from "antd";
import Card from "../card";

// !!! FIXME: specify types
type Props = {
    /** Данные по пользователю */
    data: any;
    /** @handler follow/unfollow */
    onFollowing?: Callback;
};

/**
 * @ItemEntity Карточка пользователя
 */
const User = (props: Props) => {
    const { data, onFollowing } = props;
    const { avatarUrl, login, viewerIsFollowing, bio } = data as Partial<import("models").User>;
    return (
        <Card
            className="user"
            previewUrl={avatarUrl}
            titleHref={`/${login}`}
            title={login}
            description={bio}
            actions={
                // TODO: impl later for search page
                onFollowing && (
                    <Button
                        className="user__action follow"
                        type={viewerIsFollowing ? "primary" : "default"}
                    >
                        {viewerIsFollowing ? "unfollow" : "follow"}
                    </Button>
                )
            }
        />
    );
};

export default User;
