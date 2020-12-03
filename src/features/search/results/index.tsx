import React from "react";
import cn from "classnames";
import { Skeleton, Empty, Pagination } from "antd";
import { Repo, User, Org, Card } from "shared/components";
import { useSearch } from "./hooks";
import { useSearchQuery } from "./queries.gen";
import SortSelect from "./sort-select";
import "./index.scss";

// FIXME: decompose

const PAGE_SIZE = 10;

/**
 * @feature Результаты поиска
 * @remark Отображение результатов поиска на основании запроса и конфига
 */
const SearchResults = () => {
    const { handlePageChange, page, isUserSearch, isRepoSearch, ...searchConfig } = useSearch(
        PAGE_SIZE,
    );

    const { data, loading } = useSearchQuery({ variables: searchConfig });

    const isEmpty = !loading && (!data || data.search.nodes?.length === 0);
    // prettier-ignore
    const count = (
        Number(isUserSearch) * Number(data?.search.userCount) ||
        Number(isRepoSearch) * Number(data?.search.repositoryCount) ||
        0
    )

    return (
        <div className="search-results">
            <h2 className="search-results__toolbar flex">
                <span className="search-results__label flex-grow">
                    {loading && (
                        <Skeleton
                            className="search-results__label-placeholder"
                            paragraph={false}
                            active
                        />
                    )}
                    {!loading && (
                        <>
                            {count} results by <b>{searchConfig.queryClean}</b>:
                        </>
                    )}
                </span>
                <SortSelect className="search-results__sort-select ml-4" />
            </h2>
            <div className="search-results__list">
                {loading && <Card.SkeletonGroup amount={PAGE_SIZE} />}
                {data?.search.nodes?.map((node) => (
                    <ResultItem key={node?.id} className={(node as any).__typename}>
                        {isRepoSearch && <Repo data={node} format="owner-repo" />}
                        {/* !!! FIXME: simplify */}
                        {isUserSearch &&
                            ((node as any)?.__typename === "Organization" ? (
                                <Org data={node} />
                            ) : (
                                <User data={node} />
                            ))}
                    </ResultItem>
                ))}
                {isEmpty && <Empty className="p-8" description="No results found" />}
            </div>
            <div className="search-results__pagination text-center mt-6">
                {count > PAGE_SIZE && (
                    <Pagination
                        current={page}
                        /**
                         * Отображаем минимальное
                         * - либо по кол-ву результатов,
                         * - либо с ограничением в 100 страниц
                         * (как на github)
                         * @remark Да и их API не возвращает результаты после 1000
                         */
                        total={Math.min(count, 100 * PAGE_SIZE)}
                        onChange={handlePageChange}
                        pageSize={PAGE_SIZE}
                        showSizeChanger={false}
                        showQuickJumper
                        responsive
                    />
                )}
            </div>
        </div>
    );
};

const ResultItem = ({ children, className }: PropsWithChildren & PropsWithClassName) => (
    <div className={cn("search-results__item", "mb-6", className)}>{children}</div>
);

export default SearchResults;
