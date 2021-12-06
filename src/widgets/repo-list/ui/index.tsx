import React from "react";
import { RepoSearch, repoSearchModel } from "features/repo-search";
import { useReposQuery } from "../api";
import { useFilters, useStarring } from "../model";
import Tabs from "./tabs";
import Items from "./items";
import Pagination from "./pagination";
import "./index.scss";

type Props = {
    /** @routeParam Логин пользователя текущей страницы */
    username: string;
};

/**
 * @feature Список репозиториев пользователя
 * FIXME: rename to UserRepoList? (coz - user as dep)
 * FIXME: simplify inner components
 */
export const RepoList = ({ username }: Props) => {
    const { handleTabClick, handlePaginationClick, config } = useFilters();
    const searchInput = repoSearchModel.useInput();
    const { data, loading, variables } = useReposQuery({
        variables: { login: username, ...config },
    });
    // TODO: transmit id and viewerHasStarred of nodes to handler func
    const starring = useStarring(variables);
    // const { repositories } = data?.user || {};
    const searchRepos = repoSearchModel.useQuery(`user:${username} ${searchInput.query}`);

    return (
        <div className="repo-list">
            <Tabs
                handleTabClick={handleTabClick}
                config={config}
                loading={loading}
                totalCount={searchRepos.response?.data?.search.repositoryCount}
            />
            <RepoSearch
                className="mt-4"
                value={searchInput.query}
                onChange={searchInput.handleChange}
            />
            <Items
                loading={loading}
                nodes={searchRepos.repositories}
                starring={starring}
                username={username}
            />
            <Pagination
                handlePaginationClick={handlePaginationClick}
                {...searchRepos.repositories}
            />
        </div>
    );
};
