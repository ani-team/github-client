import React from "react";
import { Select } from "antd";
import { SearchType, OrderDirection } from "models";
import * as Params from "../params";

/**
 * Select-меню для выбора сортировки поисковых результатов
 */
const SortSelect = () => {
    const { searchType } = Params.useSearchTypeParam();
    const { setSort } = Params.useSearchSortParams();

    const availableSortVariants = Params.sortVariants[searchType];

    return (
        <div className="search-results__sort-select sort-select">
            <Select
                defaultValue={Params.defaultSortVariant.label}
                onChange={(value) => {
                    // FIXME: validate
                    setSort(availableSortVariants.find(({ label }) => label === value)!);
                }}
                dropdownStyle={{ minWidth: 300 }}
            >
                {availableSortVariants.map(({ label }) => (
                    <Select.Option key={label} value={label}>
                        {label}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};

export default SortSelect;
