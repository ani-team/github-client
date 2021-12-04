import React, { useCallback, useEffect, useRef, useState } from "react";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { RepoIdentity } from "shared/api";
import "./index.scss";

export type RepoCloneMenuProps = { data: RepoIdentity };

export const RepoCloneMenu = ({ data }: RepoCloneMenuProps) => {
    const url = `https://github.com/${data.owner}/${data.name}.git`;
    const cloneField = useRef<Input>(null);
    const [isUrlCopied, setUrlCopied] = useState<boolean | null>(null);
    useEffect(() => {
        if (isUrlCopied === null) return;
        setTimeout(() => setUrlCopied(null), 1000);
    }, [isUrlCopied]);

    const copyUrl = useCallback(() => {
        const input = cloneField.current?.input;
        if (!input) return;
        input.focus();
        input.select();
        try {
            document.execCommand("copy");
            setUrlCopied(true);
        } catch (err) {
            setUrlCopied(false);
        } finally {
            input.blur();
        }
    }, [cloneField]);

    return (
        <div className="clone-content">
            <Input
                ref={cloneField}
                value={url}
                onClick={(e) => e.currentTarget.select()}
                addonAfter={
                    <Tooltip
                        title={isUrlCopied === false ? "Copy error" : "Copied"}
                        placement="bottom"
                        visible={isUrlCopied !== null}
                    >
                        <Button onClick={copyUrl} icon={<CopyOutlined className="copy-button" />} />
                    </Tooltip>
                }
            />
        </div>
    );
};
