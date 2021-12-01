import React from "react";
import { Row, Col, Alert } from "antd";
import { Search, searchModel } from "widgets/search";
import { dom } from "shared/lib/browser";

const ALERT = `For a while, "organizations" are presented in search results, but not accessible on service pages`;

/**
 * @page Search
 */
const SearchPage = () => {
    const { searchQuery } = searchModel.params.useSearchQueryParam();
    dom.useTitle(`Search · ${searchQuery}`);

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
