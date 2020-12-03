import { Button, Dropdown, Popover } from "antd";
import React, { useState } from "react";
import { RepoIdentity, BranchIdentity } from "models";
import BranchesMenu from "../branches-menu";
import CloneMenu from "./clone-menu";
import "./index.scss";

type Props = {
    repo: RepoIdentity;
    branches: Array<BranchIdentity>;
    activeBranch: string;
};

const RepoToolbar = ({ repo, branches, activeBranch }: Props) => {
    const [isBranchDropdownVisible, setBranchDropdownVisible] = useState(false);
    return (
        <div className="flex justify-between">
            <Dropdown
                overlay={
                    <BranchesMenu
                        branches={branches}
                        repo={repo}
                        onVisibleChange={setBranchDropdownVisible}
                    />
                }
                placement="bottomLeft"
                arrow
                visible={isBranchDropdownVisible}
                onVisibleChange={setBranchDropdownVisible}
                trigger={["click"]}
            >
                <Button className="branch-dropdown">{activeBranch}</Button>
            </Dropdown>
            <Popover
                placement="bottomRight"
                title="Clone this repository"
                trigger="click"
                content={<CloneMenu url={`https://github.com/${repo.owner}/${repo.name}.git`} />}
            >
                <Button className="clone-btn">Clone</Button>
            </Popover>
        </div>
    );
};

export default RepoToolbar;
