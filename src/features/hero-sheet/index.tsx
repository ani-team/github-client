import { Col, Row } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Icon } from "./assets/github-icon.svg";
import { ReactComponent as SadIcon } from "./assets/github-icon-sad.svg";
import "./index.scss";

type UserAction = {
    text: string;
    to: () => void;
};

type Props = {
    /** Основной заголовок */
    title: string;
    /** Описание/примечание */
    description: string;
    /** Предлагаемое действие */
    action?: UserAction;
    /** Использовать `sad` аватар */
    useSadHero?: boolean;
};

/**
 * Hero секция
 * @remark Используется как базовое отображение информации для HomePage, ErrorPage
 */
const HeroSheet = ({ title, description, action, useSadHero = false }: Props) => {
    const history = useHistory();
    const backAction: UserAction = {
        text: "Back",
        to: () => (history.length > 1 ? history.goBack() : history.push("/")),
    };
    const preferredAction = action ?? backAction;
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
