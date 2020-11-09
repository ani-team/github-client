import RepoList from "features/repo-list";
import UserInfo from "features/user-info";
import React from "react";
import { Row, Col } from "antd";
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<{
    username: string;
}>;

/**
 * @page User
 */
const UserPage = (props: Props) => {
    const { username } = props.match.params;

    return (
        <Row className="page page-user">
            <Col span={7} className="user-info">
                <UserInfo username={username} />
            </Col>
            <Col span={17} className="repos">
                <RepoList username={username} />
            </Col>
        </Row>
    );
};

export default UserPage;
