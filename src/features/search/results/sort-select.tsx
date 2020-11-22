import React from "react";
import { Select } from "antd";
import { SearchType, OrderDirection } from "models";
import { orderings, useSearchSortParams, useSearchTypeParam } from "../params";

/**
 * Select-меню для выбора сортировки поисковых результатов
 */
const SortSelect = () => {
    const { searchType } = useSearchTypeParam();
    const { setSort } = useSearchSortParams();

    const availableOrderings = orderings[searchType];

    return (
        <div className="search-results__sort-select sort-select">
            <Select
                defaultValue="Best Match"
                onChange={(value) => setSort(availableOrderings[value as string])}
                dropdownStyle={{ minWidth: 300 }}
            >
                {Object.entries(availableOrderings).map(([label]) => (
                    <Select.Option key={label} value={label}>
                        {label}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};

export default SortSelect;
