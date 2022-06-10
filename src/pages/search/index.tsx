import React from "react";
import { Row, Col, Alert } from "antd";
import Search from "features/search";
import { useTitle } from "../helpers";

const ALERT = `For a while, "organizations" are presented in search results, but not accessible on service pages`;

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
                    style={{ borderRadius: 6, marginTop: 10 }}
                    showIcon
                    message="Organizations access"
                    description={ALERT}
                />
            </Col>
        </Row>
    );
};

export default SearchPage;
