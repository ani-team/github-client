import { CopyOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React, { useCallback, useRef } from "react";

type Props = { url: string };

export default function CloneMenu({ url }: Props) {
    const cloneField = useRef<Input>(null);
    const copyUrl = useCallback(() => {
        const input = cloneField.current?.input;
        if (!input) return;
        input.focus();
        input.select();
        try {
            document.execCommand("copy");
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
                    <Button onClick={copyUrl} icon={<CopyOutlined className="copy-button" />} />
                }
            />
        </div>
    );
}
