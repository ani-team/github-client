import React from "react";
import { Select } from "antd";
import { SearchType, OrderDirection } from "models";
import * as Params from "../params";

/**
 * Select-меню для выбора сортировки поисковых результатов
 */
const SortSelect = () => {
    const { setSort, availableVariants, currentVariant } = Params.useSearchSortParams();

    return (
        <div className="search-results__sort-select sort-select">
            <Select
                defaultValue={currentVariant?.label}
                onChange={(value) => {
                    // FIXME: validate
                    setSort(availableVariants.find(({ label }) => label === value)!);
                }}
                dropdownStyle={{ minWidth: 300 }}
            >
                {availableVariants.map(({ label }) => (
                    <Select.Option key={label} value={label}>
                        {label}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};

export default SortSelect;
