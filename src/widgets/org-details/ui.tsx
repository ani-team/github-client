import React from "react";
import cn from "classnames";
import { Card } from "antd";
import { useOrgDetailsQuery } from "./api";
import "./styles.scss";

type Props = {
    orgname: string;
    className?: string;
};
export const OrgDetails = ({ orgname, className }: Props) => {
    const { data, loading } = useOrgDetailsQuery({ variables: { login: orgname } });
    const org = data?.organization;

    if (!loading && !org) {
        return null;
    }

    return (
        <div className={cn("org-details", className)}>
            <Card
                hoverable
                style={{ width: "100%" }}
                cover={<img alt="avatar" src={org?.avatarUrl} />}
            >
                <Card.Meta title={org?.name} description={org?.description} />
            </Card>
        </div>
    );
};
