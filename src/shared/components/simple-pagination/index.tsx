import React from "react";
import cn from "classnames";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./index.scss";

type Props = {
    /** @handler NextPage */
    onNext: Callback;
    /** @handler PrevPage */
    onPrev: Callback;
    /** @flag Доступ к следующей странице */
    hasNextPage: boolean;
    /** @flag Доступ к предыдущей странице */
    hasPrevPage: boolean;
    /** @flag Центрировать компонент */
    center?: boolean;
};

/**
 * @UIKit Простая пагинация "Назад-Вперед"
 */
const SimplePagination = (props: Props) => {
    const { onNext, onPrev, hasNextPage, hasPrevPage, center } = props;

    return (
        <div className={cn("simple-pagination", { center })}>
            <Button.Group>
                <Button className="prev-btn" disabled={!hasPrevPage} onClick={onPrev}>
                    <LeftOutlined /> Prev
                </Button>
                <Button className="next-btn" disabled={!hasNextPage} onClick={onNext}>
                    Next <RightOutlined />
                </Button>
            </Button.Group>
        </div>
    );
};

export default SimplePagination;
