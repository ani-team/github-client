import React from "react";
import { Row, Col, Alert } from "antd";
import { Search } from "features";
import { useTitle } from "../helpers";

/**
 * @page Search
 */
const SearchPage = () => {
    const { searchQuery } = Search.params.useSearchQueryParam();
    useTitle(`Search · ${searchQuery}`);

    return (
        <Row className="page page-search pb-12">
            <Col span={14} offset={2}>
                <Search.Results />
            </Col>
            <Col span={6} className="ml-4" offset={1}>
                <Search.Filters />
                <Alert
                    showIcon
                    message="Limiting results"
                    description="For a while, 'organizations' are hidden from search results by 'users' type"
                />
            </Col>
        </Row>
    );
};

export default SearchPage;
