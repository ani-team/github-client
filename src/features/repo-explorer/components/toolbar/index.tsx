import { Button, Dropdown, Popover } from "antd";
import React from "react";
import { RepoIdentity } from "models";
import BranchesMenu from "../branches-menu";
import CloneMenu from "./clone-menu";
import "./index.scss";

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
}

export default RepoToolbar;
