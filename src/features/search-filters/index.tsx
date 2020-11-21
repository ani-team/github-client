import React from "react";
import { useQueryParam, StringParam } from "use-query-params";
import { Tabs } from "shared/components";
import "./index.scss";

/**
 * @feature Фильтры для поиска
 */
const SearchFilters = () => {
    const [searchType, setSearchType] = useQueryParam("type", StringParam);

    return (
        // FIXME: resolve on tabs level
        <Tabs className="search-filters flex flex-col">
            {/* FIXME: resolve on tabs level */}
            {/* FIXME: simplify */}
            <Tabs.Item
                className="search-filters__item mb-2"
                name="Repositories"
                active={searchType === "repositories"}
                onClick={() => setSearchType("repositories")}
            />
            <Tabs.Item
                className="search-filters__item mb-2"
                name="User"
                active={searchType === "users"}
                onClick={() => setSearchType("users")}
            />
        </Tabs>
    );
};

export default SearchFilters;
