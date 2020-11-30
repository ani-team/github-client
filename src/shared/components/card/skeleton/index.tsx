import React from "react";
import { Skeleton } from "antd";
import cn from "classnames";
import "./index.scss";

/**
 * @UIKit Плейсхолдер-скелетон для карточки
 * @loading
 */
const CardSkeleton = ({ className }: PropsWithClassName) => {
    return <Skeleton.Input className={cn("card-skeleton", className)} size="large" active />;
};

export default CardSkeleton;
