import React from "react";
import { useUserInfoQuery } from "./query.gen";
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
        <div className="user-info-block">
            <img src={avatarUrl} alt="user avatar"></img>
            <h1>{name}</h1>
            <span>{bio}</span>
            <button className="btn btn-user">Follow</button>
        </div>
    );
};

export default UserInfo;
