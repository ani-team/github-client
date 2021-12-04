import React from "react";
import cn from "classnames";
import { Empty } from "antd";
import { RepoCard } from "entities/repo";
import { User, Org, Card } from "shared/ui";
import { VeryMaybe, Repository } from "shared/api";
import { SearchQuery } from "../../../api";
import { PAGE_SIZE } from "../../../model";
import "./index.scss";

type Props = {
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
    const { loading, nodes, isEmpty, isRepoSearch, isUserSearch } = props;

    return (
        <div className="search-results__list">
            {loading && <Card.SkeletonGroup amount={PAGE_SIZE} />}
            {nodes?.map((node) => (
                <div
                    key={node?.id}
                    className={cn("search-results__item", "mb-6", (node as any).__typename)}
                >
                    {/* !!! FIXME: simplify */}
                    {isRepoSearch && (
                        <RepoCard data={node as VeryMaybe<Repository>} format="owner-repo" />
                    )}
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
