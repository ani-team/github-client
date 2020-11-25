import React from "react";
import { Button, Skeleton } from "antd";
import { useCredentialsQuery, useFollowUserMutation, useUserInfoQuery } from "./queries.gen";

import "./index.scss";

type Props = {
    username: string;
};

const UserInfo = ({ username }: Props) => {
    const { data, loading } = useUserInfoQuery({
        variables: { login: username },
    });
    // FIXME: Потом надо бы брать из LocalStorage,а не запросом
    const { viewer } = useCredentialsQuery().data || {};

    const { name, avatarUrl, bio, id } = data?.user || {};

    const [followUser] = useFollowUserMutation();

    const handleFollow = () => {
        if (!id) {
            console.error("[follow] not enough user data provided", data?.user);
            return;
        }
        followUser({ variables: { id: id, clientMutationId: viewer?.id } });
    };

    return (
        <div className="user-info">
            <div className="user-info__img">
                {loading && (
                    <Skeleton.Avatar
                        className="user-info__img-placeholder"
                        active
                        shape={"square"}
                    />
                )}
                <img className="user-info__img-ava" src={avatarUrl} alt=""></img>
            </div>
            <h1 className="user-info__name">{name}</h1>
            <h4 className="user-info__username">{username}</h4>
            <span className="user-info__bio">{bio}</span>
            {viewer?.login !== username ? (
                <Button className="user-info__btn follow" onClick={handleFollow}>
                    Follow
                </Button>
            ) : (
                <Button className="user-info__btn edit">Edit profile</Button>
            )}
        </div>
    );
};

export default UserInfo;
