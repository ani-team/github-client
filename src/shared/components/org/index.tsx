import React from "react";
import { Button } from "antd";
import Card from "../card";

// !!! FIXME: specify types
const Org = (props: any) => {
    const { avatarUrl, login, description, url } = props as Partial<import("models").Organization>;
    return (
        <Card
            className="org"
            previewUrl={avatarUrl}
            title={login}
            description={description}
            actions={
                <Button
                    className="user__action follow"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    type="dashed"
                >
                    View (GitHub)
                </Button>
            }
        />
    );
};

export default Org;
