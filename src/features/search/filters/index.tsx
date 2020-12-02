import React from "react";
import { Tabs } from "shared/components";
import { str } from "shared/helpers";
import { useSearchTypeParam, typesMap } from "../params";
import "./index.scss";

/**
 * @feature Фильтры для поиска
 * @remark Допустимые типы: `Users`, `Repositories`
 * @see typesMap
 */
const SearchFilters = () => {
    const { searchType, setSearchType } = useSearchTypeParam();

    return (
        // FIXME: resolve on tabs level
        <Tabs className="search-filters flex flex-col">
            {/* FIXME: simplify */}
            {Object.keys(typesMap).map((type) => (
                <Tabs.Item
                    key={type}
                    // FIXME: resolve on tabs level
                    className="search-filters__item mb-2"
                    name={str.capitalize(type)}
                    active={searchType === type}
                    onClick={() => setSearchType(type)}
                />
            ))}
        </Tabs>
    );
};

export default SearchFilters;
