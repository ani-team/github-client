import { CopyOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";
import { Button, Dropdown, Input, Popover } from "antd";
import { RepoIdentity } from "models";
import BranchesMenu from "../branches-menu";
import "./index.scss";

type Props = {
    repo: RepoIdentity;
    branches: Array<{ name: string; prefix: string }>;
    activeBranch: string;
};

function CloneContent({ url }: { url: string }) {
    const copyUrl = useCallback(() => {
        const el = document.getElementById("clone-field") as HTMLInputElement | null;
        if (!el) return;
        el.focus();
        el.select();
        try {
            document.execCommand("copy");
        } finally {
            el.blur();
        }
    }, []);

    return (
        <div className="clone-content">
            <Input
                id="clone-field"
                value={url}
                onClick={(e) => (e.target as HTMLInputElement).select()}
                addonAfter={
                    <Button onClick={copyUrl} icon={<CopyOutlined className="copy-button" />} />
                }
            />
        </div>
    );
}

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
                content={<CloneContent url={`https://github.com/${repo.owner}/${repo.name}.git`} />}
            >
                <Button className="clone-btn">Clone</Button>
            </Popover>
        </div>
    );
}

export default RepoToolbar;
