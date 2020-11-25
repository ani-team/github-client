import React from "react";
import { Skeleton, Empty, Pagination } from "antd";
import { Repo, User } from "shared/components";
import { SearchType } from "models";
import * as Params from "../params";
import { useSearchQuery } from "./queries.gen";
import SortSelect from "./sort-select";
import "./index.scss";

// FIXME: decompose

/**
 * @hook Работа с поиском, фильтрацией, сортировкой и пагинацией
 */
const useSearch = () => {
    const { sortOrder, sortField } = Params.useSearchSortParams();
    const { searchQuery } = Params.useSearchQueryParam();
    const { searchTypeEnum } = Params.useSearchTypeParam();
    const { page, setPage } = Params.usePageParam();

    const handlePageChange = (page: number) => {
        setPage(page);
        // !!! FIXME: temp, resolve better later (by anchors / overflow / ref / scrollHandler / window patching / ...)
        document.querySelector(".gc-app")?.scrollTo({ top: 0, behavior: "smooth" });
    };

    const isUserSearch = searchTypeEnum === SearchType.User;
    const isRepoSearch = searchTypeEnum === SearchType.Repository;

    return {
        type: searchTypeEnum,
        query: `${searchQuery} sort:${sortField}-${sortOrder}`,
        queryClean: searchQuery,
        // Супер пагинация от Нияза (niyazm524)
        after: btoa(`cursor:${(page - 1) * 10}`),
        page,
        handlePageChange,
        isUserSearch,
        isRepoSearch,
    };
};

/**
 * @feature Результаты поиска
 */
const SearchResults = () => {
    const { handlePageChange, page, isUserSearch, isRepoSearch, ...searchConfig } = useSearch();

    const { data, loading } = useSearchQuery({ variables: searchConfig });

    const isEmpty = !loading && (!data || data.search.edges?.length === 0);
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
                {loading && (
                    <>
                        <ResultItemPlaceholder />
                        <ResultItemPlaceholder />
                        <ResultItemPlaceholder />
                        <ResultItemPlaceholder />
                        <ResultItemPlaceholder />
                    </>
                )}
                {/* FIXME: as wrapper? */}
                {/* FIXME: Пока что фильтруем Организации, т.к. под них нужна отдельная страница и логика */}
                {data?.search.edges
                    // @ts-ignore FIXME: specify types
                    ?.filter((edge) => edge?.node?.__typename !== "Organization")
                    .map((edge) => (
                        <ResultItem key={edge?.node?.id}>
                            {isRepoSearch && <Repo {...edge?.node} />}
                            {isUserSearch && <User {...edge?.node} />}
                        </ResultItem>
                    ))}
                {isEmpty && <Empty className="p-8" description="No results found" />}
            </div>
            <div className="search-results__pagination text-center mt-6">
                <Pagination
                    current={page}
                    /**
                     * Отображаем минимальное
                     * - либо по кол-ву результатов,
                     * - либо с ограничением в 100 страниц
                     * (как на github)
                     * @remark Да и их API не возвращает результаты после 1000
                     */
                    total={Math.min(count, 100 * 10)}
                    onChange={handlePageChange}
                    pageSize={10}
                    showSizeChanger={false}
                    responsive
                />
            </div>
        </div>
    );
};

const ResultItemPlaceholder = () => (
    <Skeleton.Input className="search-results__item-placeholder mb-6" size="large" active />
);
const ResultItem = ({ children }: PropsWithChildren) => (
    <div className="search-results__item mb-6">{children}</div>
);

export default SearchResults;
