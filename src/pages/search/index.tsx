import React from "react";
import { Row, Col, Skeleton, Empty } from "antd";
import { useQueryParam, StringParam } from "use-query-params";
import { Repo, User, Tabs } from "shared/components";
import { SearchType } from "models";
import { useSearchQuery, RepoFieldsFragment, UserFieldsFragment } from "./queries.gen";
import "./index.scss";

// !!! FIXME: decompose

const typesMap: {
    [key: string]: SearchType;
} = {
    repositories: SearchType.Repository,
    users: SearchType.User,
};

/**
 * @page Search
 * !!! TODO: split by features!!!
 */
const SearchPage = () => {
    const [searchQuery] = useQueryParam("q", StringParam);
    const [searchType, setSearchType] = useQueryParam("type", StringParam);
    const searchTypeEnum = typesMap[searchType || "repositories"];
    const { data, loading } = useSearchQuery({
        variables: {
            type: searchTypeEnum,
            query: searchQuery || "",
        },
    });

    const isEmpty = !loading && (!data || data.search.edges?.length === 0);

    return (
        <Row className="page page-search">
            <Col span={16}>
                <h2 className="toolbar">
                    Results by <b>{searchQuery}</b> search:
                </h2>
                <div className="results">
                    {loading && (
                        <>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </>
                    )}
                    {/* FIXME: as wrapper? */}
                    {/* FIXME: Пока что фильтруем Организации, т.к. под них нужна отдельная страница и логика */}
                    {data?.search.edges
                        // @ts-ignore FIXME: specify types
                        ?.filter((edge) => edge?.node?.__typename !== "Organization")
                        .map((edge) => {
                            // !!! FIXME: specify types
                            // FIXME: simplify
                            if (searchTypeEnum === SearchType.Repository) {
                                const data = edge?.node as RepoFieldsFragment;
                                return (
                                    <ResultItem key={data.id}>
                                        <Repo {...data} />
                                    </ResultItem>
                                );
                            }
                            if (searchTypeEnum === SearchType.User) {
                                const data = edge?.node as UserFieldsFragment;
                                return (
                                    <ResultItem key={data.id}>
                                        <User {...data} />
                                    </ResultItem>
                                );
                            }
                            return null;
                        })}
                    {isEmpty && <Empty className="p-8" description="No results found" />}
                </div>
            </Col>
            <Col span={7} className="ml-4">
                {/* FIXME: resolve on tabs level */}
                <Tabs className="filters flex flex-col">
                    {/* FIXME: resolve on tabs level */}
                    {/* FIXME: simplify */}
                    <Tabs.Item
                        className="filters__item mb-2"
                        name="Repositories"
                        active={searchTypeEnum === SearchType.Repository}
                        onClick={() => setSearchType("repositories")}
                    />
                    <Tabs.Item
                        className="filters__item mb-2"
                        name="User"
                        active={searchTypeEnum === SearchType.User}
                        onClick={() => setSearchType("users")}
                    />
                </Tabs>
            </Col>
        </Row>
    );
};

const ResultItem = ({ children }: PropsWithChildren) => (
    <div className="result__item mb-4">{children}</div>
);

export default SearchPage;
