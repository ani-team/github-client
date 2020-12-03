import React from "react";
import cn from "classnames";
import { Select } from "antd";
import * as Params from "../../params";

/**
 * Select-меню для выбора сортировки поисковых результатов
 * @see availableVariants
 */
const SortSelect = ({ className }: PropsWithClassName) => {
    const { setSort, availableVariants, currentVariant } = Params.useSearchSortParams();

    return (
        <div className={cn("sort-select", className)}>
            <Select
                value={currentVariant?.label}
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
