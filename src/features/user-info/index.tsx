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

    return (
        <div className="user-info-block">
            <img src={data?.user?.avatarUrl} alt="user avatar"></img>
            <h1>{data?.user?.name}</h1>
            <span>{data?.user?.bio}</span>
            <button className="btn btn-user">Follow</button>
        </div>
    );
};

export default UserInfo;
