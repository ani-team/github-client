import React from "react";
import { Row, Col, Alert } from "antd";
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
                <Alert
                    showIcon
                    message="Limiting results"
                    description="For a while, only the first 50 results of all are displayed. It will be fixed after adding pagination."
                />
            </Col>
        </Row>
    );
};

export default SearchPage;
