import React from "react";
import { Row, Col } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { UserInfo, RepoList } from "features";
import { useTitle } from "../helpers";
import "./index.scss";

type Props = RouteComponentProps<{
    username: string;
}>;

/**
 * @page User
 */
const UserPage = (props: Props) => {
    const { username } = props.match.params;
    useTitle(`User · ${username}`);

    return (
        <Row className="page page-user">
            <Col span={6} className="user-info">
                <UserInfo username={username} />
            </Col>
            <Col span={18} className="repos">
                <RepoList username={username} />
            </Col>
        </Row>
    );
};

export default UserPage;
