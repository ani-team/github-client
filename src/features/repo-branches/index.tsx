import React, { useState } from "react";
import { Button, Dropdown } from "antd";
import { RepoIdentity, BranchIdentity } from "shared/api";
import { RepoBranchesMenu } from "./menu";

type Props = {
    repo: RepoIdentity;
    branches: Array<BranchIdentity>;
    activeBranch: string;
};
export const RepoBranches = ({ repo, branches, activeBranch }: Props) => {
    const [isBranchDropdownVisible, setBranchDropdownVisible] = useState(false);
    return (
        <Dropdown
            overlay={
                <RepoBranchesMenu
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
    );
};
