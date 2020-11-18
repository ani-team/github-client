import React from "react";
import { Row, Col } from "antd";

/**
 * @page Search
 */
const SearchPage = () => {
    return (
        <Row className="page page-search">
            <Col span={18} className="bg-gray-500">
                Results by {'"---"'} search
            </Col>
            <Col span={5} className="bg-gray-300 ml-2">
                <div className="filters">
                    <div className="filters__item">Repositories</div>
                    <div className="filters__item">User</div>
                </div>
            </Col>
        </Row>
    );
};

export default SearchPage;
