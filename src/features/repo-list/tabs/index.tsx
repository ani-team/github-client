import React from "react";
import Tabs from "shared/components/tabs";
import { str } from "shared/helpers";
import { useFilters } from "../hooks";
import { tabsMap } from "../params";

type Props = {
    /** Фильтры */
    config: ReturnType<typeof useFilters>["config"];
    /** Обработчик смены вкладки */
    handleTabClick: ReturnType<typeof useFilters>["handleTabClick"];
    /** Флаг загрузки */
    loading: boolean;
    /** Общее кол-во элементов */
    totalCount?: number;
};

/**
 * Вкладки списка репозиториев
 */
const RepoListTabs = (props: Props) => {
    const { config, handleTabClick, loading, totalCount } = props;

    return (
        <Tabs className="repo-list__tabs">
            {Object.keys(tabsMap).map((type) => (
                <Tabs.Item
                    key={type}
                    name={str.capitalize(type)}
                    className="repo-list__tab"
                    active={config.tab === type}
                    onClick={() => handleTabClick(type)}
                    label={
                        config.tab === type && !loading && totalCount
                            ? String(totalCount)
                            : undefined
                    }
                />
            ))}
        </Tabs>
    );
};

export default RepoListTabs;
