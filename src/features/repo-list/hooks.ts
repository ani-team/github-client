import { alert } from "shared/helpers";
import * as Queries from "./queries.gen";
import * as Params from "./params";

export const PAGE_SIZE = 30;

/**
 * @hook star/unstar логика
 */
export const useStarring = (variables?: Queries.ReposQueryVariables) => {
    // FIXME: simplify?
    const [addStar] = Queries.useAddStarMutation();
    const [removeStar] = Queries.useRemoveStarMutation();

    const handleStarring = (repoId?: string | null, viewerHasStarred?: boolean) => {
        if (!repoId) {
            const actionType = viewerHasStarred ? "unstar" : "star";
            alert.error(`Failed to ${actionType} repo, try later`);
            return;
        }

        const action = viewerHasStarred ? removeStar : addStar;
        action({
            variables: { starrableId: repoId },
            refetchQueries: [{ variables, query: Queries.ReposDocument }],
        });
    };

    return {
        handleStarring,
    };
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
