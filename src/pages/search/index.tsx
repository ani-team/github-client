import React from "react";
import { Row, Col } from "antd";
import { Search } from "features";

/**
 * @page Search
 */
const SearchPage = () => {
    return (
        <Row className="page page-search">
            <Col span={14}>
                <Search.Results />
            </Col>
            <Col span={7} className="ml-4">
                <Search.Filters />
            </Col>
        </Row>
    );
};

export default SearchPage;
