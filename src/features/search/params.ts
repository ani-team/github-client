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
