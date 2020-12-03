import React from "react";
import Toolbar from "./toolbar";
import List from "./list";
import Pagination from "./pagination";
import { useSearch, PAGE_SIZE } from "./hooks";
import { useSearchQuery } from "./queries.gen";

/**
 * @feature Результаты поиска
 * @remark Отображение результатов поиска на основании запроса и конфига
 */
const SearchResults = () => {
    const { handlePageChange, page, isUserSearch, isRepoSearch, ...searchConfig } = useSearch();

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
            <Toolbar count={count} loading={loading} queryClean={searchConfig.queryClean} />
            <List
                nodes={data?.search.nodes}
                loading={loading}
                isEmpty={isEmpty}
                isRepoSearch={isRepoSearch}
                isUserSearch={isUserSearch}
                pageSize={PAGE_SIZE}
            />
            <Pagination
                count={count}
                handlePageChange={handlePageChange}
                page={page}
                pageSize={PAGE_SIZE}
            />
        </div>
    );
};

export default SearchResults;
