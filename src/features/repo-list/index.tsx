import React from "react";
import { Repo, Tabs, SimplePagination, Card } from "shared/components";
import { str, dom } from "shared/helpers";
import { useReposQuery } from "./queries.gen";
import * as Params from "./params";
import useStarred from "./hooks";
import "./index.scss";

type Props = {
    username: string;
};

const PAGE_SIZE = 30;

/**
 * @hook Работа с фильтрацией по affilations, пагинацией
 */
const useFilters = () => {
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
// FIXME: rename to UserRepoList? (coz - user as dep)
const RepoList = ({ username }: Props) => {
    const { handleTabClick, handlePaginationClick, config } = useFilters();
    const { data, loading, refetch } = useReposQuery({ variables: { login: username, ...config } });
    // TODO: transmit id and viewerHasStarred of nodes to handler func
    const { handleStarring } = useStarred(refetch);
    const { pageInfo, totalCount = 0, nodes } = data?.user?.repositories || {};
    const length = nodes?.length;

    return (
        <div className="repo-list">
            <Tabs className="repo-list__tabs">
                {Object.keys(Params.tabsMap).map((type) => (
                    <Tabs.Item
                        key={type}
                        name={str.capitalize(type)}
                        className="repo-list__tab"
                        active={config.tab === type}
                        onClick={() => handleTabClick(type)}
                        label={config.tab === type && !loading ? String(totalCount) : undefined}
                    />
                ))}
            </Tabs>

            <div className="repo-list__items mt-6">
                {/* NOTE: А то все {PAGE_SIZE} плейсхолдеров слишком много */}
                {loading && <Card.SkeletonGroup amount={10} />}
                {length !== 0 ? (
                    data?.user?.repositories.nodes?.map((node) => (
                        <Repo
                            onClick={() => handleStarring(node?.id, node?.viewerHasStarred)}
                            key={node?.id}
                            {...node}
                        />
                    ))
                ) : (
                    <h2 className="repo-list__placeholder">
                        {username} doesn’t have any repositories yet.
                    </h2>
                )}
            </div>
            <div className="repo-list__pagination mt-6">
                {totalCount > PAGE_SIZE && pageInfo && (
                    <SimplePagination
                        onPrev={() => {
                            handlePaginationClick({ before: pageInfo.startCursor });
                            dom.scrollToTop();
                        }}
                        onNext={() => {
                            handlePaginationClick({ after: pageInfo.endCursor });
                            dom.scrollToTop();
                        }}
                        hasNextPage={pageInfo.hasNextPage}
                        hasPrevPage={pageInfo.hasPreviousPage}
                        center
                    />
                )}
            </div>
        </div>
    );
};

export default RepoList;
