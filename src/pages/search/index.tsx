import React from "react";
import { Row, Col, Skeleton } from "antd";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
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
                            const {
                                id,
                                name,
                                owner,
                                updatedAt,
                                viewerHasStarred,
                                primaryLanguage,
                            } = edge?.node as RepoFieldsFragment;
                            const color = primaryLanguage?.color || "#222";
                            return (
                                <div key={id} className="result__item repo mt-4 p-3">
                                    <h3 className="repo__header flex justify-between">
                                        <div className="repo__title">
                                            {owner.login}/{name}
                                        </div>
                                        <div className="repo__starr">
                                            {viewerHasStarred ? <HeartFilled /> : <HeartOutlined />}
                                        </div>
                                    </h3>
                                    <div className="repo__lang flex items-center">
                                        <div
                                            className="repo__lang-marker"
                                            style={{
                                                backgroundColor: color,
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                            }}
                                        />
                                        <div className="repo__lang-label ml-2">
                                            {primaryLanguage?.name}
                                        </div>
                                    </div>
                                    <div className="repo__updatedAt">
                                        Updated on {dayjs(updatedAt).format("D MMM YYYY")}
                                    </div>
                                </div>
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

export default SearchPage;
