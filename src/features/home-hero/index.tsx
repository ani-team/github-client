import { Col, Row } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Icon } from "./assets/github-icon.svg";
import { ReactComponent as SadIcon } from "./assets/github-icon-sad.svg";
import "./index.scss";

type Props = {
    title: string;
    description: string;
    action?: { text: string; to: () => void };
    useSadHero?: boolean;
};

const HomeHero = ({ title, description, action, useSadHero = false }: Props) => {
    const history = useHistory();
    const preferredAction = action ?? {
        text: "Back",
        to: () => (history.length > 1 ? history.goBack() : history.push("/")),
    };

    return (
        <div className="page page-background">
            <Row className="home-hero">
                <Col span={16}>
                    <h1 className="home-hero__title">{title}</h1>
                    <p className="home-hero__description">{description}</p>
                    <button className="home-hero__button" onClick={() => preferredAction.to()}>
                        {preferredAction.text}
                    </button>
                </Col>
                <Col span={8}>
                    {useSadHero ? (
                        <SadIcon className="home-hero__icon" />
                    ) : (
                        <Icon className="home-hero__icon" />
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default HomeHero;
