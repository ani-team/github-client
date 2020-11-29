import React from "react";
import { ReactComponent as IcHeartActive } from "./heart_active.svg";
import { ReactComponent as IcHeartDefault } from "./heart_default.svg";

type Props = {
    isFav: boolean;
    onClick?: Callback;
    className: string;
};

const FavBtn = (props: Props) => {
    const { isFav, onClick, className } = props;
    return (
        <>
            {isFav ? (
                <IcHeartActive className={className} onClick={onClick} />
            ) : (
                <IcHeartDefault className={className} onClick={onClick} />
            )}
        </>
    );
};

export default FavBtn;
