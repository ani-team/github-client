import React from "react";
import { Button } from "antd";
import "./index.scss";

// !!! FIXME: specify types
const User = (props: any) => {
    const { avatarUrl, login, viewerIsFollowing, bio } = props as Partial<import("models").User>;
    return (
        <div className="user flex p-3">
            <div className="user__avatar">
                <img src={avatarUrl} alt="avatar" width={90} className="rounded-full" />
            </div>
            <div className="user__details ml-2 flex flex-col flex-grow">
                <a className="user__login" href={`/${login}`}>
                    {login}
                </a>
                <span className="user__bio">{bio}</span>
            </div>
            <div className="user__actions ml-2">
                <Button
                    className="user__action follow"
                    type={viewerIsFollowing ? "primary" : "default"}
                >
                    {viewerIsFollowing ? "unfollow" : "follow"}
                </Button>
            </div>
        </div>
    );
};

export default User;
