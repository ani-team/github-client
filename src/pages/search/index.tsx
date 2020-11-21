import React from "react";
import { Row, Col } from "antd";
import { SearchFilters, SearchResults } from "features";

/**
 * @page Search
 */
const SearchPage = () => {
    return (
        <Row className="page page-search">
            <Col span={16}>
                <SearchResults />
            </Col>
            <Col span={7} className="ml-4">
                <SearchFilters />
            </Col>
        </Row>
    );
};

export default SearchPage;
