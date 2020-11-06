import React from "react";
import { Button, Col, Row } from "antd";
import "./index.scss";
import { RepoGitView } from "../../features/repo-git-feat";

const RepositoryPage = () => {
    return (
        <div className="page page-repo">
            <h2>
                Название репозитория
                {/*{data?.repository?.owner.login} / {data?.repository?.name}*/}
            </h2>
            <Row className="mt-2">
                <Col span={18}>
                    <div className="flex justify-between">
                        <Button>branch</Button>
                        <Button className="clone-btn">Clone</Button>
                    </div>
                </Col>
            </Row>
            <Row className="mt-2">
                <Col span={18}>
                    <RepoGitView />
                </Col>
                <Col span={6}></Col>
            </Row>
        </div>
    );
};

export default RepositoryPage;
