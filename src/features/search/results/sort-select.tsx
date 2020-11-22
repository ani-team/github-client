import React from "react";
import { Select } from "antd";
import { SearchType, OrderDirection } from "models";
import * as Params from "../params";

/**
 * Select-меню для выбора сортировки поисковых результатов
 */
const SortSelect = () => {
    const { setSort, sortVariants } = Params.useSearchSortParams();

    return (
        <div className="search-results__sort-select sort-select">
            <Select
                defaultValue={Params.defaultSortVariant.label}
                onChange={(value) => {
                    // FIXME: validate
                    setSort(sortVariants.find(({ label }) => label === value)!);
                }}
                dropdownStyle={{ minWidth: 300 }}
            >
                {sortVariants.map(({ label }) => (
                    <Select.Option key={label} value={label}>
                        {label}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
};

export default SortSelect;
