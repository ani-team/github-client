import React from "react";
import { Button, Skeleton } from "antd";
import * as Queries from "./queries.gen";

import "./index.scss";
import useFollow from "./hooks";

type Props = {
    username: string;
};

const UserInfo = ({ username }: Props) => {
    const { data, loading, refetch } = Queries.useUserInfoQuery({
        variables: { login: username },
    });

    const { name, avatarUrl, bio, id, isViewer, viewerIsFollowing } = data?.user || {};

    const { label, handler, loadingStatus } = useFollow(id, viewerIsFollowing, refetch);

    return (
        <div className="user-info">
            <div className="user-info__img">
                {loading && (
                    <Skeleton.Avatar className="user-info__img-placeholder" active shape="square" />
                )}
                <img className="user-info__img-ava" src={avatarUrl} alt=""></img>
            </div>
            <h1 className="user-info__name">{name}</h1>
            <h4 className="user-info__username">{username}</h4>
            <span className="user-info__bio">{bio}</span>
            <br></br>
            {!isViewer ? (
                <Button
                    type={viewerIsFollowing ? "primary" : "default"}
                    className={`user-info__btn ${label}`}
                    loading={loadingStatus}
                    onClick={handler}
                >
                    {label}
                </Button>
            ) : (
                <Button className="user-info__btn edit">Edit profile</Button>
            )}
        </div>
    );
};

export default UserInfo;
