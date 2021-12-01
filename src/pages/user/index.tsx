import React from "react";
import { Row, Col } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { UserInfo, RepoList } from "widgets";
import { useTitle } from "../helpers";
import "./index.scss";

type Props = RouteComponentProps<{
    /** @routeParam Логин пользователя */
    username: string;
}>;

/**
 * @page User
 */
const UserPage = (props: Props) => {
    const { username } = props.match.params;
    useTitle(`User · ${username}`);

    return (
        <Row className="page page-user pb-12">
            <Col span={6} offset={1}>
                <UserInfo username={username} />
            </Col>
            <Col span={15}>
                <RepoList username={username} />
            </Col>
        </Row>
    );
};

export default UserPage;
