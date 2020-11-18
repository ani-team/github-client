import React from "react";
import { ReactComponent as IcHeartActive } from "./heart_active.svg";
import { ReactComponent as IcHeartDefault } from "./heart_default.svg";

type Props = {
    isFav: boolean;
};

const FavBtn = ({ isFav }: Props) => {
    return <>{isFav ? <IcHeartActive /> : <IcHeartDefault />}</>;
};

export default FavBtn;
