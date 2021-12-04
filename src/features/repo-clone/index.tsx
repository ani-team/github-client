import React from "react";
import { Button, Popover } from "antd";
import { RepoCloneMenu, RepoCloneMenuProps } from "./menu";

type Props = RepoCloneMenuProps;

export const RepoClone = ({ data }: Props) => {
    return (
        <Popover
            placement="bottomRight"
            title="Clone this repository"
            trigger="click"
            content={<RepoCloneMenu data={data} />}
        >
            <Button className="clone-btn">Clone</Button>
        </Popover>
    );
};
