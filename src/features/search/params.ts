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

type Ordering = {
    o: string | undefined;
    s: string | undefined;
};

export const orderings: {
    [key: string]: {
        [key: string]: Ordering;
    };
} = {
    repositories: {
        "Best Match": { o: undefined, s: undefined },
        "Most stars": { o: "desc", s: "stars" },
        "Fewest stars": { o: "asc", s: "stars" },
        "Most forks": { o: "desc", s: "forks" },
        "Fewest forks": { o: "asc", s: "forks" },
        "Recently updated": { o: "desc", s: "updated" },
        "Least recently updated": { o: "asc", s: "updated" },
    },
    users: {
        "Best Match": { o: undefined, s: undefined },
        "Most followers": { o: "desc", s: "followers" },
        "Fewest followers": { o: "asc", s: "followers" },
        "Most recently joined": { o: "desc", s: "joined" },
        "Least recently joined": { o: "asc", s: "joined" },
        "Most repositories": { o: "desc", s: "repositories" },
        "Fewest repositories": { o: "asc", s: "repositories" },
    },
};
/**
 * @qparam Сортировка поисковых результатов
 */
export const useSearchSortParams = () => {
    const [sortOrder, setSortOrder] = useQueryParam("o", withDefault(StringParam, ""));
    const [sortField, setSortField] = useQueryParam("s", withDefault(StringParam, ""));

    const setSort = ({ s, o }: Ordering) => {
        setSortField(s);
        setSortOrder(o);
    };
    return { sortOrder, sortField, setSort };
};
