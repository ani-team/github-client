import React from "react";
import { Input } from "antd";
import { useSearchInput } from "./model";

export const SearchInput = () => {
    const { handleKeyDown, searchValue } = useSearchInput();

    return (
        <Input
            className="header__search"
            placeholder="Search..."
            defaultValue={searchValue}
            onKeyDown={handleKeyDown}
        />
    );
};
