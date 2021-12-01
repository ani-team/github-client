import { useQueryParam, StringParam, NumberParam, withDefault } from "use-query-params";
import { SearchType } from "models";

// FIXME: split by files?
// FIXME: more strict types

//#region SearchQuery
/**
 * @qparam Поисковой запрос
 * @searchQuery
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

/**
 * Общие доступные типы сущностей для фильтрации
 * @filterType
 */
export const typesMap: Record<SearchTypeStr, SearchType> = {
    repositories: SearchType.Repository,
    users: SearchType.User,
};

/**
 * @qparam Тип результатов поиска
 * @filterType
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
    /** Направление сортировки */
    o: SortOrder | undefined;
    /** Сортируемое поле */
    s: string | undefined;
};
type SortVariant = SortParams & {
    label: string;
};

/**
 * Фабрика по генерации вариантов сортировки
 * @sort
 */
export const createSortVariant = (field: string, label = field): SortVariant[] => {
    return [
        { label: `Most ${label}`, o: "desc", s: field },
        { label: `Least ${label}`, o: "asc", s: field },
    ];
};

/**
 * Вариант сортировки по-умолчанию
 * @sort
 */
export const defaultSortVariant: SortVariant = { label: "Best Match", o: undefined, s: undefined };

/**
 * Общие доступные варианты сортировки
 * @sort
 * @see https://github.com/search
 * FIXME: simplify generating/declaring/work with sortVariants
 */
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
 * @sort
 * FIXME: Перенести часть логики в использующий компонент
 * FIXME: Попробовать убрать явную зависимость параметров
 */
export const useSearchSortParams = () => {
    const [sortOrder, setSortOrder] = useQueryParam("o", withDefault(StringParam, undefined));
    const [sortField, setSortField] = useQueryParam("s", withDefault(StringParam, undefined));
    const { searchType } = useSearchTypeParam();
    const availableVariants = sortVariantsTotal[searchType as SearchTypeStr] || [];
    const currentVariant = availableVariants.find(({ o, s }) => o === sortOrder && s === sortField);

    const setSort = ({ s, o }: SortParams) => {
        setSortField(s);
        setSortOrder(o);
    };

    const setDefaultSort = () => setSort(defaultSortVariant);

    return { sortOrder, sortField, availableVariants, currentVariant, setSort, setDefaultSort };
};

//#endregion Sort

//#region Page

/**
 * @qparam Номер страницы результаотв
 */
export const usePageParam = () => {
    const [page, setPage] = useQueryParam("p", withDefault(NumberParam, 1));

    const setDefaultPage = () => setPage(undefined);
    return {
        page,
        setPage,
        setDefaultPage,
    };
};
