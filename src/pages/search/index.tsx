import React from "react";
import { Row, Col, Skeleton } from "antd";
import { Repo } from "shared/components";
import { SearchType } from "models";
import { useSearchQuery, RepoFieldsFragment } from "./queries.gen";
import "./index.scss";

/**
 * @page Search
 */
const SearchPage = () => {
    const type = SearchType.Repository;
    const query = "commitlint";
    const { data, loading } = useSearchQuery({
        variables: { type, query },
    });

    const isEmpty = !loading && (!data || data.search.edges?.length === 0);

    return (
        <Row className="page page-search">
            <Col span={18}>
                <div className="toolbar">
                    Results by <b>{query}</b> search
                </div>
                <div className="results">
                    {loading && (
                        <>
                            <Skeleton active />
                            <Skeleton active />
                            <Skeleton active />
                        </>
                    )}
                    {data?.search.edges?.map((edge) => {
                        // !!! FIXME: specify types
                        if (type === SearchType.Repository) {
                            const data = edge?.node as RepoFieldsFragment;
                            return (
                                <ResultItem key={data.id}>
                                    <Repo {...data} />
                                </ResultItem>
                            );
                        }
                        return "???";
                    })}
                    {isEmpty && "Not found anything"}
                </div>
            </Col>
            <Col span={5} className="bg-gray-300 ml-4">
                <div className="filters">
                    <div className="filters__item">Repositories</div>
                    <div className="filters__item">User</div>
                </div>
            </Col>
        </Row>
    );
};

const ResultItem = ({ children }: PropsWithChildren) => (
    <div className="result__item mb-4">{children}</div>
);

export default SearchPage;
