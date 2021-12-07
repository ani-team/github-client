import React from "react";
import cn from "classnames";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { VeryMaybe, Repository } from "shared/api";
import "./styles.scss";

type Props = {
    /** Данные по репозиторию */
    data: VeryMaybe<Repository>;
    onStarring: Callback;
};

export const RepoStar = (props: Props) => {
    const { viewerHasStarred: starred } = props.data || {};
    const FavBtn = starred ? HeartFilled : HeartOutlined;

    return <FavBtn className={cn("repo__fav", { starred })} onClick={props.onStarring} />;
};
