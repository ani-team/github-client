import React from "react";
import { Col, Row } from "antd";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { RepoDetails, RepoExplorer } from "features";
import { RepoIdentity } from "../../models";
import "./index.scss";

type RouteParams = {
    username: string;
    repository: string;
    branch?: string;
};

const RepositoryPage = () => {
    const params = useParams<RouteParams>();
    const identity: RepoIdentity = {
        owner: params.username,
        name: params.repository,
        branch: params.branch ? params.branch.replace(/^tree\//, "") : undefined,
    };
    return (
        <div className="page page-repo">
            <Row className="mt-2">
                <Col span={18}>
                    <h2>
                        <Link to={`/${identity.owner}`}>{identity.owner}</Link>
                        <span>&nbsp;/&nbsp;</span>
                        <Link to={`/${identity.owner}/${identity.name}`} className="font-bold">
                            {identity.name}
                        </Link>
                    </h2>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col span={18}>
                    <RepoExplorer repo={identity} />
                </Col>
                <Col span={5} offset={1}>
                    <RepoDetails />
                </Col>
            </Row>
        </div>
    );
};

export default RepositoryPage;
