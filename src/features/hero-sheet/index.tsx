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

const HeroSheet = ({ title, description, action, useSadHero = false }: Props) => {
    const history = useHistory();
    const preferredAction = action ?? {
        text: "Back",
        to: () => (history.length > 1 ? history.goBack() : history.push("/")),
    };
    const HeroIcon = useSadHero ? SadIcon : Icon;

    return (
        <div className="page page-background">
            <Row className="hero-sheet">
                <Col span={16}>
                    <h1 className="hero-sheet__title">{title}</h1>
                    <p className="hero-sheet__description">{description}</p>
                    <button className="hero-sheet__button" onClick={() => preferredAction.to()}>
                        {preferredAction.text}
                    </button>
                </Col>
                <Col span={8}>
                    <HeroIcon className="hero-sheet__icon" />
                </Col>
            </Row>
        </div>
    );
};

export default HeroSheet;
