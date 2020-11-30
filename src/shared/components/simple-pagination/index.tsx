import React from "react";
import cn from "classnames";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./index.scss";

type Props = {
    onNext: Callback;
    onPrev: Callback;
    hasNextPage: boolean;
    hasPrevPage: boolean;
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
                <Button disabled={!hasPrevPage} onClick={onPrev}>
                    <LeftOutlined /> Prev
                </Button>
                <Button disabled={!hasNextPage} onClick={onNext}>
                    Next <RightOutlined />
                </Button>
            </Button.Group>
        </div>
    );
};

export default SimplePagination;
