import { useState } from "react";
import { useDebounce } from "shared/lib/fp";
import { alert } from "shared/lib/browser";
import * as Queries from "../queries.gen";
import * as Params from "./params";

export const PAGE_SIZE = 30;

/**
 * @hook star/unstar логика
 * TODO: add debounced loading/disabled logic
 * TODO: add errors catching
 */
export const useStarring = (variables?: Queries.ReposQueryVariables) => {
    // FIXME: simplify?
    const [addStar] = Queries.useAddStarMutation();
    const [removeStar] = Queries.useRemoveStarMutation();
    // FIXME: temp, impl better later
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const debouncedLoadingId = useDebounce(loadingId);

    // FIXME: more strict
    const handle = async (repoId?: string | null, viewerHasStarred?: boolean) => {
        const actionType = viewerHasStarred ? "unstar" : "star";
        if (!repoId) {
            alert.error(`Failed to ${actionType} repo, try later`);
            return;
        }
        setLoadingId(repoId);
        // request
        const action = viewerHasStarred ? removeStar : addStar;
        await action({
            variables: { starrableId: repoId },
            refetchQueries: [{ variables, query: Queries.ReposDocument }],
        });
        // fulfilled
        alert.success(`Successfully ${actionType}red!`);
        setLoadingId(null);
    };

    return { handle, loadingId, debouncedLoadingId };
};

/**
 * @hook Работа с фильтрацией по affilations, пагинацией
 */
export const useFilters = () => {
    const { tab, setTab, tabEnum } = Params.useTabParam();
    const { after, before, setCursor } = Params.useCursorParam();

    /**
     * Обработчик выбора вкладки
     * @remark Реактивно сбрасываем пагинацию, при смене вкладки
     */
    const handleTabClick: typeof setTab = (type) => {
        setTab(type);
        setCursor({});
    };

    /**
     * Обработчик пагинации
     * @remark Явно определяем вкладку, чтобы она точно была задана (для соответствия ссылок features/origin)
     */
    const handlePaginationClick: typeof setCursor = (pageInfo) => {
        setTab(tab);
        setCursor(pageInfo);
    };

    return {
        config: {
            tab,
            ownerAffiliations: [tabEnum],
            after,
            before,
            /**
             * @variant (!before, !after) => Первый вход, фетчим первые {PAGE_SIZE}
             * @variant (after, !before) => След. страница, фетчим след. первые {PAGE_SIZE}
             * @variant (!after, before) => Пред. страница, фетчим пред. последние {PAGE_SIZE}
             * @variant (after, before) => (невозможна из-за реализации)
             */
            first: (!before && PAGE_SIZE) || undefined,
            last: (before && PAGE_SIZE) || undefined,
        },
        handleTabClick,
        handlePaginationClick,
    };
};
