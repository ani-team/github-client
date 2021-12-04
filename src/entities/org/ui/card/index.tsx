import React from "react";
import { Button } from "antd";
import { BankOutlined } from "@ant-design/icons";
import { VeryMaybe, Organization } from "shared/api";
import { Card } from "shared/ui";
import "./index.scss";

type Props = {
    /** Данные по организции */
    data: VeryMaybe<Organization>;
};

/**
 * @ItemEntity Карточка организации
 */
export const OrgCard = (props: Props) => {
    const { avatarUrl, login, description, url } = props.data || {};

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
