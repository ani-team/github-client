import React from "react";
import { Skeleton, Empty } from "antd";
import { Repo, User } from "shared/components";
import { SearchType } from "models";
import * as Params from "../params";
import { useSearchQuery, RepoFieldsFragment, UserFieldsFragment } from "./queries.gen";
import SortSelect from "./sort-select";
import "./index.scss";

/**
 * @hook Работа с поиском, фильтрацией и сортировкой
 */
const useSearch = () => {
    const { sortOrder, sortField } = Params.useSearchSortParams();
    const { searchQuery } = Params.useSearchQueryParam();
    const { searchTypeEnum } = Params.useSearchTypeParam();

    return {
        type: searchTypeEnum,
        query: `${searchQuery} sort:${sortField}-${sortOrder}`,
        queryClean: searchQuery,
    };
};

/**
 * @feature Результаты поиска
 */
const SearchResults = () => {
    const searchConfig = useSearch();
    const { data, loading } = useSearchQuery({ variables: searchConfig });

    const isEmpty = !loading && (!data || data.search.edges?.length === 0);

    return (
        <div className="search-results">
            <h2 className="search-results__toolbar flex">
                <span className="search-results__label flex-grow">
                    Results by <b>{searchConfig.queryClean}</b> search:
                </span>
                <SortSelect />
            </h2>
            <div className="search-results__list">
                {loading && (
                    <>
                        <Skeleton active />
                        <Skeleton active />
                        <Skeleton active />
                    </>
                )}
                {/* FIXME: as wrapper? */}
                {/* FIXME: Пока что фильтруем Организации, т.к. под них нужна отдельная страница и логика */}
                {data?.search.edges
                    // @ts-ignore FIXME: specify types
                    ?.filter((edge) => edge?.node?.__typename !== "Organization")
                    .map((edge) => {
                        // !!! FIXME: specify types
                        // FIXME: simplify
                        if (searchConfig.type === SearchType.Repository) {
                            const data = edge?.node as RepoFieldsFragment;
                            return (
                                <ResultItem key={data.id}>
                                    <Repo {...data} />
                                </ResultItem>
                            );
                        }
                        if (searchConfig.type === SearchType.User) {
                            const data = edge?.node as UserFieldsFragment;
                            return (
                                <ResultItem key={data.id}>
                                    <User {...data} />
                                </ResultItem>
                            );
                        }
                        return null;
                    })}
                {isEmpty && <Empty className="p-8" description="No results found" />}
            </div>
        </div>
    );
};

const ResultItem = ({ children }: PropsWithChildren) => (
    <div className="search-results__item mb-6">{children}</div>
);

export default SearchResults;
