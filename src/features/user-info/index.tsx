import React from "react";
import { Button } from "antd";
import { useUserInfoQuery } from "./queries.gen";
import "./index.scss";

type Props = {
    username: string;
};

const UserInfo = ({ username }: Props) => {
    const { data } = useUserInfoQuery({
        variables: { login: username },
    });

    const { name, avatarUrl, bio } = data?.user || {};

    return (
        <div className="user-info">
            <img className="user-info__img" src={avatarUrl} alt="user avatar"></img>
            <h1 className="user-info__name">{name}</h1>
            <span className="user-info__bio">{bio}</span>
            <Button className="user-info__btn follow">Follow</Button>
        </div>
    );
};

export default UserInfo;
