import { Col, Row } from "antd";
import React from "react";
import { ReactComponent as Icon } from "./github-icon.svg";
import "./index.scss";

const HomeHero = () => {
    return (
        <Row className="home-hero">
            <Col span={16}>
                <h1 className="home-hero__title">
                    Github in minimalistic design. Built for developers.
                </h1>
                <p className="home-hero__description">Welcome to our GithubClient!</p>
                {/* FIXME: specify link from Auth.feature (but on page or another level - without hardcoding) */}
                <a className="home-hero__button" href="/auth">
                    START NOW
                </a>
            </Col>
            <Col span={8}>
                <Icon className="home-hero__icon" />
            </Col>
        </Row>
    );
};

export default HomeHero;
