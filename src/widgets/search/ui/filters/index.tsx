import React from "react";
import { Tabs } from "shared/ui";
import * as string from "shared/lib/string";
import { useSearch, params } from "../../model";
import "./index.scss";

/**
 * @feature Фильтры для поиска
 * @remark Допустимые типы: `Users`, `Repositories`
 * @see typesMap
 */
const SearchFilters = () => {
    const { handleTypeChange, typeLiteral } = useSearch();

    return (
        // FIXME: resolve on tabs level
        <Tabs className="search-filters flex flex-col">
            {/* FIXME: simplify */}
            {Object.keys(params.typesMap).map((type) => (
                <Tabs.Item
                    key={type}
                    // FIXME: resolve on tabs level
                    className="search-filters__item mb-2"
                    name={string.capitalize(type)}
                    active={typeLiteral === type}
                    onClick={() => handleTypeChange(type)}
                />
            ))}
        </Tabs>
    );
};

export default SearchFilters;
