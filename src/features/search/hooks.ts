import { dom } from "shared/helpers";
import { SearchType } from "models";
import * as Params from "./params";

const PAGE_SIZE = 10;

/**
 * @hook Работа с поиском, фильтрацией, сортировкой и пагинацией
 */
export const useSearch = () => {
    const { sortOrder, sortField } = Params.useSearchSortParams();
    const { searchQuery } = Params.useSearchQueryParam();
    const { searchTypeEnum } = Params.useSearchTypeParam();
    const { page, setPage } = Params.usePageParam();

    const handlePageChange = (page: number) => {
        setPage(page);
        dom.scrollToTop();
    };

    const isUserSearch = searchTypeEnum === SearchType.User;
    const isRepoSearch = searchTypeEnum === SearchType.Repository;

    return {
        type: searchTypeEnum,
        query: `${searchQuery} sort:${sortField}-${sortOrder}`,
        queryClean: searchQuery,
        // Супер пагинация от Нияза (niyazm524)
        after: btoa(`cursor:${(page - 1) * PAGE_SIZE}`),
        page,
        first: PAGE_SIZE,
        handlePageChange,
        isUserSearch,
        isRepoSearch,
    };
};
