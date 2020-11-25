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
