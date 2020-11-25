import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { RepositoryAffiliation } from "models";

export const tabsMap: Record<string, RepositoryAffiliation> = {
    repositories: RepositoryAffiliation.Owner,
    collabs: RepositoryAffiliation.Collaborator,
};

/**
 * @qparam Активная вкладка
 */
export const useTabParam = () => {
    const [tab, setTab] = useQueryParam("tab", withDefault(StringParam, "repositories"));
    const tabEnum = tabsMap[tab];

    return { tab, tabEnum, setTab };
};

type SetCursorArgs = {
    after?: string | null;
    before?: string | null;
};

/**
 * @qparam Текущий курсор в пагинации репозиториев
 */
export const useCursorParam = () => {
    const [after, setAfter] = useQueryParam("after", StringParam);
    const [before, setBefore] = useQueryParam("before", StringParam);

    const setCursor = ({ after, before }: SetCursorArgs) => {
        // setValue(value || undefined);
        setAfter(after || undefined);
        setBefore(before || undefined);
    };

    return {
        after,
        before,
        setCursor,
    };
};
