import { useEffect } from "react";
import { useQueryParam, StringParam, NumberParam, withDefault } from "use-query-params";
import { SearchType } from "models";

// FIXME: split by files?
// FIXME: more strict types

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

type SearchTypeStr = "repositories" | "users";

export const typesMap: Record<SearchTypeStr, SearchType> = {
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
    const searchTypeEnum = typesMap[searchType as SearchTypeStr];

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

// FIXME: simplify generating/declaring/work with sortVariants
export const sortVariantsTotal: Record<SearchTypeStr, SortVariant[]> = {
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
 * FIXME: Перенести часть логики в использующий компонент
 * FIXME: Попробовать убрать явную зависимость параметров
 */
export const useSearchSortParams = () => {
    const [sortOrder, setSortOrder] = useQueryParam("o", withDefault(StringParam, undefined));
    const [sortField, setSortField] = useQueryParam("s", withDefault(StringParam, undefined));
    const { searchType } = useSearchTypeParam();
    const availableVariants = sortVariantsTotal[searchType as SearchTypeStr] || [];
    const currentVariant = availableVariants.find(({ o, s }) => o === sortOrder && s === sortField);

    /**
     * Если сменили SearchType и текущую сортировку не определить
     * То сбрасываем параметры сортировки и задаем дефолтный вариант
     * !!! FIXME: specify
     * !!! FIXME: double calling
     */
    useEffect(() => {
        if (!currentVariant) {
            setSort(defaultSortVariant);
        }
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [searchType]);

    const setSort = ({ s, o }: SortParams) => {
        setSortField(s);
        setSortOrder(o);
    };

    return { sortOrder, sortField, availableVariants, currentVariant, setSort };
};

//#endregion Sort

//#region Page

/**
 * @qparam Номер страницы результаотв
 */
export const usePageParam = () => {
    const [page, setPage] = useQueryParam("p", withDefault(NumberParam, 1));
    return {
        page,
        setPage,
    };
};
