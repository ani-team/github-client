import { useQueryParam, StringParam, withDefault } from "use-query-params";
import { SearchType } from "models";

// FIXME: split by files?

//#region SearchQuery
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

//#endregion SearchQuery

//#region SearchType

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

//#endregion SearchType

//#region Sort
type SortOrder = "asc" | "desc";
type SortParams = {
    o: SortOrder | undefined;
    s: string | undefined;
};
type SortVariant = SortParams & {
    label: string;
};

export const createSortVariant = (field: string, label = field): SortVariant[] => {
    return [
        { label: `Most ${label}`, o: "desc", s: field },
        { label: `Least ${label}`, o: "asc", s: field },
    ];
};

export const defaultSortVariant: SortVariant = { label: "Best Match", o: undefined, s: undefined };

export const sortVariants: {
    [key: string]: SortVariant[];
} = {
    repositories: [
        defaultSortVariant,
        ...createSortVariant("stars"),
        ...createSortVariant("forks"),
        ...createSortVariant("updated", "recently updated"),
    ],
    users: [
        defaultSortVariant,
        ...createSortVariant("followers"),
        ...createSortVariant("joined", "recently joined"),
        ...createSortVariant("repositories"),
    ],
};

/**
 * @qparam Сортировка поисковых результатов
 */
export const useSearchSortParams = () => {
    const [sortOrder, setSortOrder] = useQueryParam("o", withDefault(StringParam, ""));
    const [sortField, setSortField] = useQueryParam("s", withDefault(StringParam, ""));

    const setSort = ({ s, o }: SortParams) => {
        setSortField(s);
        setSortOrder(o);
    };

    return { sortOrder, sortField, setSort };
};

//#endregion Sort
