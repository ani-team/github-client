import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { RepoIdentity, BranchIdentity } from "shared/api";
import "./index.scss";

type Props = {
    repo: RepoIdentity;
    branches?: Array<BranchIdentity>;
    onVisibleChange?: (flag: boolean) => void;
};

const BranchesMenu = ({ repo, branches, onVisibleChange }: Props) => {
    return (
        <Menu className="branches-menu">
            {branches?.map((branch, index) => (
                <Menu.Item key={index} onClick={() => onVisibleChange?.(false)}>
                    <Link to={`/${repo.owner}/${repo.name}/tree/${branch.name}`}>
                        {branch.name}
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    );
};

export default BranchesMenu;
