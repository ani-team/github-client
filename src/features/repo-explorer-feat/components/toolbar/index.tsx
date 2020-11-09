import React from "react";
import { Button, Dropdown } from "antd";
import BranchesMenu from "../branches-menu";
import { RepoIdentity } from "../../../../models";

type Props = {
    repo: RepoIdentity;
    branches: Array<{ name: string; prefix: string }>;
    activeBranch: string;
};

function RepoToolbar({ repo, branches, activeBranch }: Props) {
    return (
        <div className="flex justify-between">
            <Dropdown
                overlay={<BranchesMenu branches={branches} repo={repo} />}
                placement="bottomLeft"
                arrow
                trigger={["click"]}
            >
                <Button className="branch-dropdown">{activeBranch}</Button>
            </Dropdown>
            <Button className="clone-btn">Clone</Button>
        </div>
    );
}

export default RepoToolbar;
