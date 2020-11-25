import React from "react";
import { Col, Row } from "antd";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { RepoDetails, RepoExplorer } from "features";
import { RepoIdentity } from "models";
import { useTitle } from "../helpers";
import "./index.scss";

type Props = RouteComponentProps<{
    username: string;
    repository: string;
    branch?: string;
}>;

const RepositoryPage = (props: Props) => {
    const { username, repository, branch } = props.match.params;
    const identity: RepoIdentity = {
        owner: username,
        name: repository,

        branch: branch ? branch.replace(/^tree\//, "") : undefined,
    };

    useTitle(`Repository · ${username}/${repository}`);

    return (
        <div className="page page-repo">
            <Row className="mt-2">
                <Col span={18}>
                    <h2>
                        <Link to={`/${identity.owner}`} className="owner">
                            {identity.owner}
                        </Link>
                        <span>{" / "}</span>
                        <Link to={`/${identity.owner}/${identity.name}`}>{identity.name}</Link>
                    </h2>
                </Col>
            </Row>
            <Row className="page-repo__main mt-2" gutter={[24, 16]}>
                <Col span={17}>
                    <RepoExplorer repo={identity} />
                </Col>
                <Col span={6}>
                    <RepoDetails repo={identity} />
                </Col>
            </Row>
        </div>
    );
};

export default RepositoryPage;
