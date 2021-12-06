import React from "react";
import { Input } from "antd";

type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler;
};

export const RepoSearch = ({ className, value, onChange }: Props) => {
    return (
        <Input.Search
            className="mb-4"
            placeholder="Find a repository..."
            onChange={onChange}
            value={value}
        />
    );
};
