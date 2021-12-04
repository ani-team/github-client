import { KeyboardEventHandler } from "react";
import { StringParam, useQueryParams } from "use-query-params";
import { useHistory, useLocation } from "react-router-dom";
import * as qs from "query-string";

// FIXME: get from `pages`?
const SEARCH_URL = "/search";

/**
 * @hook Логика обработки инпута поиска
 */
export const useSearchInput = () => {
    // !!! FIXME: limit scope of query-params literals
    const [query] = useQueryParams({
        q: StringParam,
        type: StringParam,
        s: StringParam,
        o: StringParam,
    });
    const location = useLocation();
    const history = useHistory();

    /**
     * Обработка инпута поиска
     */
    const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = ({ key, currentTarget }) => {
        if (key === "Enter" && currentTarget.value) {
            const q = currentTarget.value;
            history.push(`${SEARCH_URL}?${qs.stringify({ ...query, q })}`);
        }
    };
    /**
     * Поисковой запрос
     * @remark Если не страница поиска - обнуляем инпут
     */
    const searchValue = location.pathname === SEARCH_URL ? query.q ?? "" : "";

    return { handleKeyDown, searchValue };
};
