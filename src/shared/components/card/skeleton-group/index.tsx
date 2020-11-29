import React from "react";
import Skeleton from "../skeleton";

type Props = {
    amount: number;
};

/**
 * @UIKit Набор плейсхолдеров
 * @remark Служит как синтаксическая обертка для перечисления {amount} плейсхолдеров
 */
const CardSkeletonGroup = ({ amount }: Props) => (
    <>
        {Array(amount)
            .fill(null)
            .map((_, index) => (
                <Skeleton key={index} className="mb-5" />
            ))}
    </>
);

export default CardSkeletonGroup;
