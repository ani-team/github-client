import React from "react";
import { Button } from "antd";
import { BankOutlined } from "@ant-design/icons";
import Card from "../card";
import "./index.scss";

// !!! FIXME: specify types
const Org = (props: any) => {
    const { avatarUrl, login, description, url } = props as Partial<import("models").Organization>;
    return (
        <Card
            className="org"
            previewUrl={avatarUrl}
            title={
                <span title="Organization">
                    <BankOutlined /> {login}
                </span>
            }
            description={description}
            actions={
                <Button
                    className="user__action follow"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    type="dashed"
                    title="Click to view full information about organization (from github)"
                >
                    View (GitHub)
                </Button>
            }
        />
    );
};

export default Org;
