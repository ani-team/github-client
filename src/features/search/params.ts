import { useQueryParam, StringParam, withDefault } from "use-query-params";
import { SearchType } from "models";

/**
 * @qparam Поисковой запрос
 */
export const useSearchQueryParam = () => {
    const [searchQuery, setSearchQuery] = useQueryParam("q", withDefault(StringParam, ""));
    return {
        searchQuery,
        setSearchQuery,
    };
};

export const typesMap: Record<string, SearchType> = {
    repositories: SearchType.Repository,
    users: SearchType.User,
};

/**
 * @qparam Тип результатов поиска
 */
export const useSearchTypeParam = () => {
    const [searchType, setSearchType] = useQueryParam(
        "type",
        withDefault(StringParam, "repositories"),
    );
    const searchTypeEnum = typesMap[searchType];

    return {
        searchType,
        searchTypeEnum,
        setSearchType,
    };
};

/**
 * @qparam Сортировка поисковых результатов
 */
export const useSearchSortParams = () => {
    const [sortOrder, setSortOrder] = useQueryParam("o", withDefault(StringParam, ""));
    const [sortField, setSortField] = useQueryParam("s", withDefault(StringParam, ""));

    return { sortOrder, setSortOrder, sortField, setSortField };
};
