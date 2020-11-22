import React from "react";
import { Button, Skeleton } from "antd";
import { useGetViewerQuery, useUserInfoQuery } from "./queries.gen";
import "./index.scss";

type Props = {
    username: string;
};

const UserInfo = ({ username }: Props) => {
    const { data, loading } = useUserInfoQuery({
        variables: { login: username },
    });
    const { login } = useGetViewerQuery().data?.viewer || {};

    const { name, avatarUrl, bio } = data?.user || {};

    return (
        <div className="user-info">
            <div className="user-info__img-placeholder">
                {loading && (
                    <Skeleton.Avatar className="user-info__img-skeleton" active shape={"square"} />
                )}
            </div>
            <img className="user-info__img" src={avatarUrl} alt=""></img>
            <h1 className="user-info__name">{name}</h1>
            <h4 className="user-info__username">{username}</h4>
            <span className="user-info__bio">{bio}</span>
            {login !== username ? (
                <Button className="user-info__btn follow">Follow</Button>
            ) : (
                <Button className="user-info__btn follow">Edit profile</Button>
            )}
        </div>
    );
};

export default UserInfo;
