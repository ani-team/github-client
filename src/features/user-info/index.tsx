import React from "react";
import { Button, Skeleton } from "antd";
import * as Queries from "./queries.gen";
import { useFollowing } from "./hooks";
import "./index.scss";

type Props = {
    /** @routeParam Логин пользователя текущей страницы */
    username: string;
};

/**
 * @feature Карточка пользователя
 * FIXME: rename to UserDetails
 */
const UserInfo = ({ username }: Props) => {
    const { data, loading, variables } = Queries.useUserInfoQuery({
        variables: { login: username },
    });
    const following = useFollowing(variables);
    const { name, avatarUrl, bio, isViewer, viewerIsFollowing, id } = data?.user || {};
    // FIXME: temp
    const label = viewerIsFollowing ? "unfollow" : "follow";

    return (
        <div className="user-info">
            <div className="user-info__img">
                {loading ? (
                    <Skeleton.Avatar className="user-info__img-placeholder" active shape="square" />
                ) : (
                    <img className="user-info__img-ava" src={avatarUrl} alt=""></img>
                )}
            </div>
            <h1 className="user-info__name">{name}</h1>
            <h4 className="user-info__username">{username}</h4>
            <span className="user-info__bio">{bio}</span>
            {isViewer ? (
                <Button className="user-info__btn" disabled title="While not available">
                    Edit profile
                </Button>
            ) : (
                <Button
                    type={viewerIsFollowing ? "primary" : "default"}
                    className="user-info__btn"
                    onClick={() => following.handle(id, viewerIsFollowing)}
                    loading={following.debouncedLodaing}
                >
                    {label}
                </Button>
            )}
        </div>
    );
};

export default UserInfo;
