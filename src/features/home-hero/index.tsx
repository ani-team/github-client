import { Col, Row } from "antd";
import React from "react";
import { ReactComponent as Icon } from "./github-icon.svg";
import { ReactComponent as SadIcon } from "./github-icon-sad.svg";
import "./index.scss";

type Props = {
    title: string;
    description: string;
    action: { text: string; to: () => void };
    useSadHero?: boolean;
};

const HomeHero = ({ title, description, action, useSadHero = false }: Props) => {
    return (
        <Row className="home-hero">
            <Col span={16}>
                <h1 className="home-hero__title">{title}</h1>
                <p className="home-hero__description">{description}</p>
                <button className="home-hero__button" onClick={() => action.to()}>
                    {action.text}
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
    );
};

export default HomeHero;
