import { dom } from "shared/helpers";
import { SearchType } from "models";
import * as Params from "./params";

export const PAGE_SIZE = 10;

/**
 * @hook Работа с поиском, фильтрацией, сортировкой и пагинацией
 */
export const useSearch = () => {
    const { sortOrder, sortField, setSort } = Params.useSearchSortParams();
    const { searchQuery } = Params.useSearchQueryParam();
    const { searchType, searchTypeEnum, setSearchType } = Params.useSearchTypeParam();
    const { page, setPage } = Params.usePageParam();

    /**
     * При смене страницы - скроллим страницу вверх (к результатам)
     */
    const handlePageChange = (page: number) => {
        setPage(page);
        dom.scrollToTop();
    };

    /**
     * Если сменили SearchType, то:
     * - сбрасываем параметры сортировки и задаем дефолтный вариант
     * - сбрасываем номер страницы
     */
    const handleTypeChange = (type: string) => {
        setSearchType(type);
        setSort(Params.defaultSortVariant);
    };

    const isUserSearch = searchTypeEnum === SearchType.User;
    const isRepoSearch = searchTypeEnum === SearchType.Repository;

    return {
        typeLiteral: searchType,
        type: searchTypeEnum,
        query: `${searchQuery} sort:${sortField}-${sortOrder}`,
        queryClean: searchQuery,
        // Супер пагинация от Нияза (niyazm524)
        after: btoa(`cursor:${(page - 1) * PAGE_SIZE}`),
        page,
        first: PAGE_SIZE,
        handlePageChange,
        handleTypeChange,
        isUserSearch,
        isRepoSearch,
    };
};
