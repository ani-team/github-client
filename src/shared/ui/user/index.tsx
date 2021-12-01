import React from "react";
import { Button } from "antd";
import { VeryMaybe, User } from "shared/api";
import Card from "../card";

type Props = {
    /** Данные по пользователю */
    data: VeryMaybe<User>;
    /** @handler follow/unfollow */
    onFollowing?: Callback;
};

/**
 * @ItemEntity Карточка пользователя
 */
const UserCard = (props: Props) => {
    const { data, onFollowing } = props;
    const { avatarUrl, login, viewerIsFollowing, bio } = data || {};
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

export default UserCard;
