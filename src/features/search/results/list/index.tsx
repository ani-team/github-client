import React from "react";
import cn from "classnames";
import { Empty } from "antd";
import { Repo, User, Org, Card } from "shared/components";
import { SearchQuery } from "../queries.gen";
import "./index.scss";

type Props = {
    /** Размер страницы */
    pageSize: number;
    /** Флаг загрузки */
    loading: boolean;
    /** Результаты поиска */
    nodes: SearchQuery["search"]["nodes"];
    /** Флаг пустого результата поиска */
    isEmpty: boolean;
    /** Флаг - поиск по репозиториям */
    isRepoSearch: boolean;
    /** Флаг - поиск по пользователям */
    isUserSearch: boolean;
};

/**
 * Список результатов поиска
 */
const ResultsList = (props: Props) => {
    const { loading, nodes, pageSize, isEmpty, isRepoSearch, isUserSearch } = props;

    return (
        <div className="search-results__list">
            {loading && <Card.SkeletonGroup amount={pageSize} />}
            {nodes?.map((node) => (
                <div
                    key={node?.id}
                    className={cn("search-results__item", "mb-6", (node as any).__typename)}
                >
                    {/* !!! FIXME: simplify */}
                    {isRepoSearch && <Repo data={node} format="owner-repo" />}
                    {isUserSearch &&
                        ((node as any)?.__typename === "Organization" ? (
                            <Org data={node} />
                        ) : (
                            <User data={node} />
                        ))}
                </div>
            ))}
            {isEmpty && <Empty className="p-8" description="No results found" />}
        </div>
    );
};

export default ResultsList;
