import React from "react";
import { Empty } from "antd";
import { Repo, Tabs, SimplePagination, Card } from "shared/components";
import { str, dom } from "shared/helpers";
import { useReposQuery } from "./queries.gen";
import { useFilters, PAGE_SIZE, useStarring } from "./hooks";
import { tabsMap } from "./params";
import "./index.scss";

type Props = {
    /** @routeParam Логин пользователя текущей страницы */
    username: string;
};

/**
 * @feature Список репозиториев пользователя
 * FIXME: rename to UserRepoList? (coz - user as dep)
 */
const RepoList = ({ username }: Props) => {
    const { handleTabClick, handlePaginationClick, config } = useFilters();
    const { data, loading, variables } = useReposQuery({
        variables: { login: username, ...config },
    });
    // TODO: transmit id and viewerHasStarred of nodes to handler func
    const starring = useStarring(variables);
    const { pageInfo, totalCount = 0, nodes } = data?.user?.repositories || {};
    const length = nodes?.length;

    return (
        <div className="repo-list">
            <Tabs className="repo-list__tabs">
                {Object.keys(tabsMap).map((type) => (
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
                            onStarring={() => starring.handle(node?.id, node?.viewerHasStarred)}
                            key={node?.id}
                            data={node}
                            loading={starring.debouncedLoadingId === node?.id}
                        />
                    ))
                ) : (
                    <Empty
                        className="repo-list__placeholder"
                        description={<h2>{username} doesn’t have any repositories yet.</h2>}
                    />
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
