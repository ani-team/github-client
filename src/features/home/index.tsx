import { Col, Row } from "antd";
import React from "react";
import GithubIcon from "./icon";
import "./index.scss";

const HomeInfo = () => {
    return (
        <Row className="home-info">
            <Col span={16}>
                <h1 className="home-info__title">
                    Github in minimalistic design. Built for developers.
                </h1>
                <p className="home-info__description">Welcome to our GithubClient!</p>
                {/* FIXME: redirect to other page if user isAuth*/}
                <a className="home-info__button" href="/auth">
                    START NOW
                </a>
            </Col>
            <Col span={8}>
                <GithubIcon />
            </Col>
        </Row>
    );
};

export default HomeInfo;
