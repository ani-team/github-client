import React from "react";
import { Menu } from "antd";
import "./index.scss";
import { Link } from "react-router-dom";
import { RepoIdentity } from "../../../../models";

type Props = {
    repo: RepoIdentity;
    branches?: Array<{ name: string; prefix: string }>;
};

function BranchesMenu({ repo, branches }: Props) {
    return (
        <Menu className="branches-menu" onClick={() => {}}>
            {branches?.map((branch, index) => (
                <Menu.Item key={index}>
                    <Link to={`/${repo.owner}/${repo.name}/tree/${branch.name}`}>
                        {branch.name}
                    </Link>
                </Menu.Item>
            ))}
        </Menu>
    );
}

export default BranchesMenu;
